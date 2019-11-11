import React, { Component } from 'react';

import Navbar from './components/Layout/Navbar';




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            // <Provider store={store}>
            // <BrowserRouter basename={config.basename}>
            <div>
                APP
                        <Navbar />
            </div>
            // </BrowserRouter>
            // </Provider>
        );
    }
}

export default App;