import { combineReducers } from 'redux';
import getCommonReducers from '../reducers/CommonReducers';
import reducer from '../Reducers/MenuReducers';
let reducers = ["products"];
let allReducers = { reducer };
reducers.map(rec => {
    allReducers[rec] = getCommonReducers(rec);
});
export default combineReducers(allReducers);
