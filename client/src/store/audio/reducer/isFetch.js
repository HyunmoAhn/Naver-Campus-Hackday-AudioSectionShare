import { combineActions, handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = false;

const isFetchReducer = handleActions({
	[actions.audioInformationRequest]: () => true,
	[combineActions(
		actions.audioInformationSuccess,
		actions.audioInformationFailure,
	)]: () => false,
}, initialState);

export default isFetchReducer;