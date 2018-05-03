"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkVisible = checkVisible;
/**
 * Created by hai.xiong on 2018/5/2.
 */
var defaultBoundingClientRect = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0
};

/**
 * 检查元素在垂直方向上是否在可视范围内
 * @param node 元素节点
 * @param offset 上下偏移量 默认 为0，格式[上偏移量，下偏移量]
 * @returns {boolean}
 */
function checkVisible(node) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    // 元素被隐藏
    if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;

    var top = void 0,
        elementHeight = void 0;

    try {
        var _node$getBoundingClie = node.getBoundingClientRect();

        top = _node$getBoundingClie.top;
        elementHeight = _node$getBoundingClie.height;
    } catch (e) {
        top = defaultBoundingClientRect.top;
        // 失败了都展示

        elementHeight = defaultBoundingClientRect.height;
    }

    var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

    // 出现在是窗前的预留长度
    var offsets = Array.isArray(offset) ? offset : [offset, offset];

    // 上边框出现在视区
    // 下边看出现在视区
    return top - offsets[0] <= windowInnerHeight && top + elementHeight + offsets[1] >= 0;
}