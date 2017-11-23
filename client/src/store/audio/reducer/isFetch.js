import { combineActions, handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = false;

const isFetchReducer = handleActions({
	[combineActions(
		actions.audioInformationRequest,
		actions.audioShareInformationRequest,
	)]: () => true,
	[combineActions(
		actions.audioInformationSuccess,
		actions.audioInformationFailure,
		actions.audioShareInformationSuccess,
		actions.audioShareInformationFailure,
	)]: () => false,
}, initialState);

export default isFetchReducer;