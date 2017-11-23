import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const audioInfoReducer = handleActions({
	[actions.audioInformationSuccess]: (state, action) => action.payload.info,
}, initialState);

export default audioInfoReducer;