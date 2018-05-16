/**
 * Created by hai.xiong on 2018/5/2.
 */
const defaultBoundingClientRect = {
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
export function checkVisible(node, offset = 0) {
    // 元素被隐藏
    if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;

    const {top, height} = getElementPosition(node),
        windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

    // 出现在是视窗前的预留长度
    const offsets = Array.isArray(offset) ? offset : [offset, offset];

    // 上边框出现在视区  元素的顶部距离视窗顶部 + 偏移量 <= 视窗高度
    // 下边框出现在视区  元素的顶部距离视窗顶部 + 元素高度 + 偏移量 >= 0
    return (top - offsets[0] <= windowInnerHeight) &&
        (top + height + offsets[1] >= 0);
}

/**
 * 检查元素在垂直方向上是否在可视范围内 元素在overflow中(只关心元素在overflow容器中的位置，不关心元素是否真的出现在窗口中)
 * @param node 元素节点
 * @param offset 上下偏移量 默认 为0，格式[上偏移量，下偏移量]
 * @returns {boolean}
 */
export function checkOverflowVisible(node, offset = 0) {
    // 元素被隐藏
    if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;

    const parent = getOverflowParent(node), // 获取overflow容器
        {top: parentTop, height: parentHeight} = getElementPosition(parent),
        {top: nodeTop, height: nodeHeight} = getElementPosition(node),
        realTop = nodeTop - parentTop;

    // 出现在是视窗前的预留长度
    const offsets = Array.isArray(offset) ? offset : [offset, offset];

    // 上边框出现在视区  元素的顶部距离overflow容器顶部 + 偏移量 <= 视窗高度
    // 下边框出现在视区  元素的顶部距离overflow容器顶部 + 元素高度 + 偏移量 >= 0
    return (realTop - offsets[0] <= parentHeight) &&
        (realTop + nodeHeight + offsets[1] >= 0);
}

const overflowRegex = /(scroll|auto)/;
export function getOverflowParent(node) {
    if (!node || node === document.documentElement) {
        return document.documentElement;
    }

    const style = window.getComputedStyle(node),
        overflow = style['overflow'],
        overflowY = style['overflow-y'];

    if (overflowRegex.test(overflow) || overflowRegex.test(overflowY)) {
        return node;
    }

    return getOverflowParent(node.parentNode);
}

function getElementPosition(node) {
    let top, height;
    try {
        ({top, height} = node.getBoundingClientRect());
    } catch (e) {
        // 0 0
        ({top, height} = defaultBoundingClientRect);
    }

    return {top, height}
}