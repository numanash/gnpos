import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";
const enhancers = [
    applyMiddleware(thunk)
];

export default () => {
    if (process.env.NODE_ENV !== "production") {
        window.__REDUX_DEVTOOLS_EXTENSION__ && enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    }

    const store = createStore(rootReducer, compose(...enhancers));
    if (module.hot) {
        module.hot.accept('./rootReducers', () => {
            const nextReducer = require("./rootReducers").default
            store.replaceReducer(nextReducer)
        })
    }

    return store;
}