import { combineReducers } from 'redux-immutable';
import isFetch from './isFetch';

const audioReducer = combineReducers({
	isFetch,
});

export default audioReducer;