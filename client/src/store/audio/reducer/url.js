import { combineActions, handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const urlReducer = handleActions({
	[combineActions(
		actions.audioInformationSuccess,
		actions.audioInformationUsedListSuccess,
	)]: (state, action) => action.payload.src,
	[combineActions(
		actions.audioInformationRequest,
		actions.audioInformationUsedListRequest,
	)]: () => initialState,
}, initialState);

export default urlReducer;