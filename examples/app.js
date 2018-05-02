/**
 * Created by hai.xiong on 2018/4/28.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ExampleList from './components/ExampleList';

class App extends React.PureComponent {
    render() {
        return (
            <ExampleList />
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));