import { combineReducers } from 'redux';
import getCommonReducers from '../reducers/CommonReducers';
import reducer from '../Reducers/MenuReducers';
let reducers = ["orders", "header", "categories", "modules", "roles", "permissions", "user", "users", "main", "websites"];
let allReducers = { reducer };
// reducers.map(rec => {
//     allReducers[rec] = getCommonReducers(rec);
// });
export default combineReducers(allReducers);
