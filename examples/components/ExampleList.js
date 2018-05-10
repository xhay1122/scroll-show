/**
 * Created by hai.xiong on 2018/4/28.
 */

import React, {PureComponent} from 'react';

import Item from './Item';

import ScrollShow from '../../es/'

class ExampleList extends PureComponent {
    render() {
        return (
            <div>
                {this.renderNormalTest()}
                {this.renderOverflowTest()}
            </div>
        )
    }

    renderNormalTest() {
        let ll = [];
        for (let i = 0; i < 5; i++) {
            ll.push((
                <ScrollShow key={i}>
                    <Item name={i}/>
                </ScrollShow>
            ))
        }

        return (
            <div>
                <h1><a href="#renderNormalTest">1.正常文档流滚动</a></h1>
                <i>上下滚动检查元素隐藏和展示</i>
                {ll}
            </div>
        )
    }

    renderOverflowTest() {
        let ll = [];
        for (let i = 0; i < 15; i++) {
            ll.push((
                <ScrollShow key={i} isOverflow={true}>
                    <Item name={i}/>
                </ScrollShow>
            ))
        }

        return (
            <div>
                <h1><a href="#renderOverflowTest">2.overflow元素滚动</a></h1>
                <i>上下滚动检查元素隐藏和展示</i>
                <div style={{height: '500px', overflowY: 'scroll', border: '1px solid'}}>
                    {ll}
                </div>
            </div>
        )
    }
}

export default ExampleList;