import { combineActions, handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const audioInfoReducer = handleActions({
	[combineActions(
		actions.audioInformationSuccess,
		actions.audioInformationUsedListSuccess,
	)]: (state, action) => action.payload.info,
}, initialState);

export default audioInfoReducer;