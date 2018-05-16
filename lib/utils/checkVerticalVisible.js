'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkVisible = checkVisible;
exports.checkOverflowVisible = checkOverflowVisible;
exports.getOverflowParent = getOverflowParent;
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

    var _getElementPosition = getElementPosition(node),
        top = _getElementPosition.top,
        height = _getElementPosition.height,
        windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

    // 出现在是视窗前的预留长度


    var offsets = Array.isArray(offset) ? offset : [offset, offset];

    // 上边框出现在视区  元素的顶部距离视窗顶部 + 偏移量 <= 视窗高度
    // 下边框出现在视区  元素的顶部距离视窗顶部 + 元素高度 + 偏移量 >= 0
    return top - offsets[0] <= windowInnerHeight && top + height + offsets[1] >= 0;
}

/**
 * 检查元素在垂直方向上是否在可视范围内 元素在overflow中(只关心元素在overflow容器中的位置，不关心元素是否真的出现在窗口中)
 * @param node 元素节点
 * @param offset 上下偏移量 默认 为0，格式[上偏移量，下偏移量]
 * @returns {boolean}
 */
function checkOverflowVisible(node) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    // 元素被隐藏
    if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;

    var parent = getOverflowParent(node),
        _getElementPosition2 = getElementPosition(parent),
        parentTop = _getElementPosition2.top,
        parentHeight = _getElementPosition2.height,
        _getElementPosition3 = getElementPosition(node),
        nodeTop = _getElementPosition3.top,
        nodeHeight = _getElementPosition3.height,
        realTop = nodeTop - parentTop;

    // 出现在是视窗前的预留长度
    var offsets = Array.isArray(offset) ? offset : [offset, offset];

    // 上边框出现在视区  元素的顶部距离overflow容器顶部 + 偏移量 <= 视窗高度
    // 下边框出现在视区  元素的顶部距离overflow容器顶部 + 元素高度 + 偏移量 >= 0
    return realTop - offsets[0] <= parentHeight && realTop + nodeHeight + offsets[1] >= 0;
}

var overflowRegex = /(scroll|auto)/;
function getOverflowParent(node) {
    if (!node || node === document.documentElement) {
        return document.documentElement;
    }

    var style = window.getComputedStyle(node),
        overflow = style['overflow'],
        overflowY = style['overflow-y'];

    if (overflowRegex.test(overflow) || overflowRegex.test(overflowY)) {
        return node;
    }

    return getOverflowParent(node.parentNode);
}

function getElementPosition(node) {
    var top = void 0,
        height = void 0;
    try {
        var _node$getBoundingClie = node.getBoundingClientRect();

        top = _node$getBoundingClie.top;
        height = _node$getBoundingClie.height;
    } catch (e) {
        top = defaultBoundingClientRect.top;
        // 0 0

        height = defaultBoundingClientRect.height;
    }

    return { top: top, height: height };
}