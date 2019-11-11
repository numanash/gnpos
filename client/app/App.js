import React, { Component } from 'react';
import Navigation from './components/Layout/Navigation';






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
                        <Navigation />
            </div>
            // </BrowserRouter>
            // </Provider>
        );
    }
}

export default App;