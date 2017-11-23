import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const urlReducer = handleActions({
	[actions.audioInformationSuccess]: (state, action) => action.payload.src,
}, initialState);

export default urlReducer;