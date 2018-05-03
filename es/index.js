/**
 * Created by hai.xiong on 2018/4/28.
 */

import React, {PureComponent} from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import {on, off} from './utils/event';
import passiveEvent from './utils/eventType';
import {checkVisible} from './utils/checkVerticalVisible';

const listeners = [];

// 事件处理
const triggerHandler = () => {
    for (let i = 0; i < listeners.length; ++i) {
        checkElementVisible(listeners[i]);
    }
};
// 更新组件
const forceComponent = (component, isVisible) => {
    component.visible = isVisible;
    component.forceUpdate();
};
// 检查组件是否在可视区域
const checkElementVisible = (component) => {
    const node = ReactDom.findDOMNode(component);
    if (!node) return;

    const visible = checkVisible(node, component.props.offset);

    // 状态改变时更新
    if (visible !== component.visible) {
        forceComponent(component, visible);
    }
};


class ScrollShow extends PureComponent {
    constructor(props) {
        super(props);
        this.visible = false;
    }

    componentDidMount() {
        let {scroll, resize} = this.props;

        // 事件列表为空时 注册滚动和resize事件
        if (listeners.length === 0) {
            if (scroll) {
                on(window, 'scroll', triggerHandler, passiveEvent);
            }
            if (resize) {
                on(window, 'resize', triggerHandler, passiveEvent);
            }
        }

        // 添加到事件列表
        listeners.push(this);
        // 初始化时先check
        checkElementVisible(this);
    }

    // 组件卸载时移除事件
    componentWillUnmount() {
        const index = listeners.indexOf(this);

        // 删除监听的元素
        if (index !== -1) {
            listeners.splice(index, 1);
        }

        // 监听列表为空时 注销事件
        if (listeners.length === 0) {
            off(window, 'resize', triggerHandler, passiveEvent);
            off(window, 'scroll', triggerHandler, passiveEvent);
        }
    }

    render() {
        let {children, minHeight} = this.props;

        return (
            <div style={{"minHeight": minHeight}}>
                <div style={this.visible ? null : {'display': 'none'}}>
                    {children}
                </div>
            </div>
        )
    }

}

ScrollShow.propTypes = {
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    resize: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.node
};

ScrollShow.defaultProps = {
    minHeight: '100px',
    offset: 300,
    resize: false,
    scroll: true
};

export default ScrollShow;