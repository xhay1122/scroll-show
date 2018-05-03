'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _event = require('./utils/event');

var _eventType = require('./utils/eventType');

var _eventType2 = _interopRequireDefault(_eventType);

var _checkVerticalVisible = require('./utils/checkVerticalVisible');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hai.xiong on 2018/4/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var listeners = [];

// 事件处理
var triggerHandler = function triggerHandler() {
    for (var i = 0; i < listeners.length; ++i) {
        checkElementVisible(listeners[i]);
    }
};
// 更新组件
var forceComponent = function forceComponent(component, isVisible) {
    component.visible = isVisible;
    component.forceUpdate();
};
// 检查组件是否在可视区域
var checkElementVisible = function checkElementVisible(component) {
    var node = _reactDom2.default.findDOMNode(component);
    if (!node) return;

    var visible = (0, _checkVerticalVisible.checkVisible)(node, component.props.offset);

    // 状态改变时更新
    if (visible !== component.visible) {
        forceComponent(component, visible);
    }
};

var ScrollShow = function (_PureComponent) {
    _inherits(ScrollShow, _PureComponent);

    function ScrollShow(props) {
        _classCallCheck(this, ScrollShow);

        var _this = _possibleConstructorReturn(this, (ScrollShow.__proto__ || Object.getPrototypeOf(ScrollShow)).call(this, props));

        _this.visible = false;
        return _this;
    }

    _createClass(ScrollShow, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                scroll = _props.scroll,
                resize = _props.resize;

            // 事件列表为空时 注册滚动和resize事件

            if (listeners.length === 0) {
                if (scroll) {
                    (0, _event.on)(window, 'scroll', triggerHandler, _eventType2.default);
                }
                if (resize) {
                    (0, _event.on)(window, 'resize', triggerHandler, _eventType2.default);
                }
            }

            // 添加到事件列表
            listeners.push(this);
            // 初始化时先check
            checkElementVisible(this);
        }

        // 组件卸载时移除事件

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var index = listeners.indexOf(this);

            // 删除监听的元素
            if (index !== -1) {
                listeners.splice(index, 1);
            }

            // 监听列表为空时 注销事件
            if (listeners.length === 0) {
                (0, _event.off)(window, 'resize', triggerHandler, _eventType2.default);
                (0, _event.off)(window, 'scroll', triggerHandler, _eventType2.default);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                minHeight = _props2.minHeight;


            return _react2.default.createElement(
                'div',
                { style: { "minHeight": minHeight } },
                _react2.default.createElement(
                    'div',
                    { style: this.visible ? null : { 'display': 'none' } },
                    children
                )
            );
        }
    }]);

    return ScrollShow;
}(_react.PureComponent);

ScrollShow.propTypes = {
    minHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
    resize: _propTypes2.default.bool,
    scroll: _propTypes2.default.bool,
    children: _propTypes2.default.node
};

ScrollShow.defaultProps = {
    minHeight: '100px',
    offset: 300,
    resize: false,
    scroll: true
};

exports.default = ScrollShow;