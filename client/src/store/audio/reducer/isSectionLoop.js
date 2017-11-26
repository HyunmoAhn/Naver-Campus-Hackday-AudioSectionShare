import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = false;

const isSectionLoopReducer = handleActions({
	[actions.audioSetTrueSectionLoop]: () => true,
	[actions.audioSetFalseSectionLoop]: () => false,
	[actions.audioToggleSectionLoop]: state => !state,
}, initialState);

export default isSectionLoopReducer;