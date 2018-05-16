'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withScrollShow = undefined;

var _ScrollShow = require('./ScrollShow');

var _ScrollShow2 = _interopRequireDefault(_ScrollShow);

var _decorator = require('./decorator');

var _decorator2 = _interopRequireDefault(_decorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 注解形式
/**
 * Created by hai.xiong on 2018/5/16.
 */

exports.withScrollShow = _decorator2.default;
// 组件形式

exports.default = _ScrollShow2.default;