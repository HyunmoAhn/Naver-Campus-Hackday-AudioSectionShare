import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = [];

const listReducer = handleActions({
	[actions.audioListFetchSuccess]: (state, action) => action.payload,
}, initialState);

export default listReducer;