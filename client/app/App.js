import React, { Component } from 'react';
import Aux from './constants/hoc/_Aux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<Aux>
            <div></div>
        </Aux>);
    }
}

export default App;