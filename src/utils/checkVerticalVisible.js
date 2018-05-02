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

    let top, elementHeight;

    try {
        ({top, height: elementHeight} = node.getBoundingClientRect());
    } catch (e) {
        // 失败了都展示
        ({top, height: elementHeight} = defaultBoundingClientRect);
    }

    const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

    // 出现在是窗前的预留长度
    const offsets = Array.isArray(offset) ? offset : [offset, offset];

    // 上边框出现在视区
    // 下边看出现在视区
    return (top - offsets[0] <= windowInnerHeight) &&
        (top + elementHeight + offsets[1] >= 0);
}