import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import Aux from './constants/hoc/_Aux';
import routes from './routes';
import { connect } from 'react-redux';
import Navbar from './components/Layout/Navbar';
import Loader from './static/Loader';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const appRoutes = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component
                            {...props}
                        />
                    )}
                />
            ) : null
        });


        return (
            <Aux>
                <div className="wrapper">
                    <Navbar />
                    <Navigation />
                    <div className="content-wrapper p-2">
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                {appRoutes}
                                <Redirect from="/" to={this.props.defaultPath} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        defaultPath: state.reducer.defaultPath

    }

}


export default connect(mapStateToProps)(App);