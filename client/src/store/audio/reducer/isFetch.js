import { combineActions, handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = false;

const isFetchReducer = handleActions({
	[combineActions(
		actions.audioInformationRequest,
		actions.audioShareInformationRequest,
		actions.audioInformationUsedListRequest,
	)]: () => true,
	[combineActions(
		actions.audioInformationSuccess,
		actions.audioInformationFailure,
		actions.audioShareInformationSuccess,
		actions.audioShareInformationFailure,
		actions.audioInformationUsedListSuccess,
		actions.audioInformationUsedListFailure,
	)]: () => false,
}, initialState);

export default isFetchReducer;