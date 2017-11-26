import { combineReducers } from 'redux-immutable';
import audioInfo from './audioInfo';
import isFetch from './isFetch';
import isSectionLoop from './isSectionLoop';
import list from './list';
import shareContent from './shareContent';
import title from './title';
import url from './url';

const audioReducer = combineReducers({
	audioInfo,
	isFetch,
	isSectionLoop,
	list,
	shareContent,
	title,
	url,
});

export default audioReducer;