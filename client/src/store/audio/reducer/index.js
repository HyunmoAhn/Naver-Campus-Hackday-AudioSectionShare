import { combineReducers } from 'redux-immutable';
import audioInfo from './audioInfo';
import isFetch from './isFetch';
import title from './title';
import url from './url';

const audioReducer = combineReducers({
	audioInfo,
	isFetch,
	title,
	url,
});

export default audioReducer;