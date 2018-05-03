/**
 * Created by hai.xiong on 2018/4/28.
 */

import React, {PureComponent} from 'react';

class Item extends PureComponent {
    constructor(props) {
        super(props);
        // console.log('--->constructor : ', this.props.name);
    }

    render() {

        // console.log('--->redner : ', this.props.name);

        return (
            <div>
                <div className="blck">
                    ==>空白(Item) height:300px
                    <br/>
                    this.props.name {this.props.name}
                </div>
            </div>
        )
    }
}

export default Item;