/**
 * Created by hai.xiong on 2018/4/28.
 */

import React, {PureComponent} from 'react';

import Item from './Item';

import ScrollShow from '../../es/'

class ExampleList extends PureComponent{

    render(){

        let ll = [];
        for(let i=0;i<100;i++) {
            ll.push((
                <ScrollShow key={i}>
                    <Item name={i} />
                </ScrollShow>
            ))
        }

        return (
            <div>
                <div className="blck">空白 height:300px</div>
                {ll}
                <div className="blck">空白 height:300px</div>
            </div>
        )
    }
}

export default ExampleList;