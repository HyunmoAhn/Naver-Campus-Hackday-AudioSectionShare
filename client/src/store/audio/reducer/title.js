import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const titleReducer = handleActions({
	[actions.audioInformationSuccess]: (state, action) => action.payload.title,
}, initialState);

export default titleReducer;