import { combineReducers } from 'redux-immutable';
import audioInfo from './audioInfo';
import isFetch from './isFetch';
import shareContent from './shareContent';
import title from './title';
import url from './url';

const audioReducer = combineReducers({
	audioInfo,
	isFetch,
	shareContent,
	title,
	url,
});

export default audioReducer;