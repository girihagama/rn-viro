import { combineReducers } from 'redux';
import main_Reducer from './main_Reducer';
import navigation_Reducer from './navigation_Reducer';

module.exports = combineReducers({
    store: main_Reducer,
    navigation_Reducer
});