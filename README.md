
参考 [react-lazyload](https://github.com/jasonslyvia/react-lazyload/) 实现的组件动态展示插件。

## 设计初衷

在使用Ant Design时由于表单元素过多，导致操作十分卡顿，通过官方建议拆分表单后优化效果不明显。
于是分析原因发现卡顿是因为页面多大后的rendering耗时太长。
而每次操作的ListItem之间是相互不影响的，所以尝试把其他不需要的Item隐藏掉（dispaly:'none'），此时整个表单流畅度大幅度提升。

## 设计思路

对比react-lazyload，其核心是控制不可见区域元素不渲染或者首次加载不渲染。

而scroll-show做的事情是，解决某些场景下（ant-design表单提交）需要元素真实存在，但不再视窗时不Rendering。

*react中，页面中元素过多时，当有状态改变时，会导致Rendering事件特别长，why?*

实现的核心是在组件的render方法中:
```jsx
<div style={{"minHeight": minHeight}}>
    <div style={this.visible ? null : {'display': 'none'}}>
        {children}
    </div>
</div>
```

`minHeight`参数是必须的，在子元素都隐藏时需要组件有高度，提供给滚动时判断是否出现在可视区域

## 适用场景

页面上循环出来的组件过多时，导致整个页面卡顿，使用组件包裹每一个循环元素解决卡顿。

## 安装

```
$ npm install --save react-lazyload
```

## 示例

```
<ScrollShow>
    <div>普通用法</div>
</ScrollShow>

// 注解形式使用
@withScrollShow()
class CompA extends PureComponent{}

<ScrollShow minHeight={'300px'}>
    <div>设置隐藏时占位节点的高度，为了避免滚动时抖动，建议设置成和真实组件一样的高度</div>
</ScrollShow>

<ScrollShow offset={[200,100]}>
    <div>出现在视窗上/下偏差指定像素时让真实组件可见，可以避免滚动时抖动</div>
</ScrollShow>

<ScrollShow isOverflow={true}>
    <div>在一个overflow元素中纵向滚动</div>
</ScrollShow>
```

## 参数说明

### children

默认：undefined

子组件

### minHeight

类型：数字/字符串 默认：100px

用于隐藏元素的占位区域，建议和实际元素高度一致

### offset

类型：数字/数组 默认：300

控制组件接近视窗（viewport）之前多少距离展示出组件，可以避免页面滚动时抖动，建议设置该值为大于0的数

### isOverflow

类型：boolean 默认：false

由于监听的是window上的scroll事件，所以当组件存在于某个 overflow/overflow-y:scroll/auto 的父容器当中时，该容器内部的滚动是不会被监听到的。
可以通过手动设置组件的isOverflow属性表明元素是否存在于这让的容器中。

### scroll

类型：boolean 默认：true

监听滚动事件

### resize

类型：boolean 默认：false

监听窗口改变事件

## TODO

* isOverflow 自动判断
* 水平方向上判断判断容器是否存在
* 添加内部元素是隐藏还是展示占位的配置与实现（目前只有隐藏）
* 函数防抖与截流配置支持