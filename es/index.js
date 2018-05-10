/**
 * Created by hai.xiong on 2018/4/28.
 */

import React, {PureComponent} from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import {on, off} from './utils/event';
import passiveEvent from './utils/eventType';
import {checkVisible, checkOverflowVisible, getOverflowParent} from './utils/checkVerticalVisible';

// 存放包裹元素的实例
// window-scroll / window-resize / parent-xxxx
const listeners = {};

// 事件处理
const triggerHandler = (flag) => {
    let handleListeners = listeners[flag] || [];
    handleListeners.forEach((item) => {
        checkElementVisible(item);
    })
};
// 检查组件是否在可视区域
const checkElementVisible = (component) => {
    const node = ReactDom.findDOMNode(component);
    if (!node) return;

    const {isOverflow, offset} = component.props,
        visible = isOverflow ? checkOverflowVisible(node, offset) : checkVisible(node, offset);

    // 状态改变时更新
    if (visible !== component.visible) {
        forceComponent(component, visible);
    }
};
// 更新组件
const forceComponent = (component, isVisible) => {
    component.visible = isVisible;
    component.forceUpdate();
};

const DOM_FLAG = 'data-store-name';

class ScrollShow extends PureComponent {
    constructor(props) {
        super(props);
        this.visible = false;
    }

    componentDidMount() {
        let {scroll, resize, isOverflow} = this.props;

        // overflow模式
        if (isOverflow) {
            this.overflowContainer = getOverflowParent(ReactDom.findDOMNode(this));

            let parent = this.overflowContainer;

            if (parent && typeof parent.getAttribute) {
                let storeName = parent.getAttribute(DOM_FLAG);
                if (!storeName) {
                    storeName = 'parent' + (new Date().getTime());
                    parent.setAttribute(DOM_FLAG, storeName);
                }
                this.toBindEvent(parent, storeName);
            }
        } else { // 正常布局模式
            if(scroll) {
                this.toBindEvent(window, 'window-scroll');
            }
            if(resize) {
                this.toBindEvent(window, 'window-resize', 'resize');
            }
        }
    }

    // 绑定和初始化事件
    toBindEvent(el, storeName, eventType = 'scroll') {
        listeners[storeName] = listeners[storeName] ? listeners[storeName] : [];
        // 添加到事件列表
        listeners[storeName].push(this);

        // 初次添加时bind事件
        if (listeners[storeName].length === 1) {
            on(el, eventType, triggerHandler.bind(null, storeName), passiveEvent);
        }

        // 初始化时先check
        checkElementVisible(this);
    }

    // 组件卸载时移除事件
    componentWillUnmount() {
        let {scroll, resize, isOverflow} = this.props;

        if (isOverflow) {
            let parent = this.overflowContainer;

            if (parent && typeof parent.getAttribute) {
                let storeName = parent.getAttribute(DOM_FLAG);
                this.toUnBindEvent(parent, storeName);
            }
        } else {
            if(scroll) {
                this.toUnBindEvent(window, 'window-scroll');
            }
            if(resize) {
                this.toUnBindEvent(window, 'window-resize', 'resize');
            }
        }
    }
    // 组件销毁时移除队列及事件
    toUnBindEvent(el, storeName, eventType = 'scroll') {
        const index = listeners[storeName].indexOf(this);

        // 删除监听的元素
        if (index !== -1) {
            listeners[storeName].splice(index, 1);
        }

        if (listeners[storeName].length === 0) {
            off(el, eventType, triggerHandler, passiveEvent);
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
    children: PropTypes.node,
    isOverflow: PropTypes.bool
};

ScrollShow.defaultProps = {
    minHeight: '100px',
    offset: 300,
    resize: false,
    scroll: true,
    isOverflow: false
};

export default ScrollShow;