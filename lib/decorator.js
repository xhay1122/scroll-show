'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ScrollShow = require('./ScrollShow');

var _ScrollShow2 = _interopRequireDefault(_ScrollShow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hai.xiong on 2018/5/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getDisplayName = function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

exports.default = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function scrollShow(WrappedComponent) {
        return function (_PureComponent) {
            _inherits(ScrollShowDecorated, _PureComponent);

            function ScrollShowDecorated() {
                _classCallCheck(this, ScrollShowDecorated);

                var _this = _possibleConstructorReturn(this, (ScrollShowDecorated.__proto__ || Object.getPrototypeOf(ScrollShowDecorated)).call(this));

                _this.displayName = 'ScrollShow' + getDisplayName(WrappedComponent);
                return _this;
            }

            _createClass(ScrollShowDecorated, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(
                        _ScrollShow2.default,
                        options,
                        _react2.default.createElement(WrappedComponent, this.props)
                    );
                }
            }]);

            return ScrollShowDecorated;
        }(_react.PureComponent);
    };
};