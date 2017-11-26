import { combineActions, handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const titleReducer = handleActions({
	[combineActions(
		actions.audioInformationSuccess,
		actions.audioInformationUsedListSuccess,
	)]: (state, action) => action.payload.title,
}, initialState);

export default titleReducer;