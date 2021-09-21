import initial_Reducer from './initial_Reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    initial_Reducer: initial_Reducer,
});

export default rootReducer;