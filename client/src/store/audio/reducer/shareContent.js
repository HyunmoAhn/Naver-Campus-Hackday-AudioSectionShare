import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const shareContentReducer = handleActions({
	[actions.audioInformationSuccess]: (state, action) => {
		return action.payload.content || state;
	},
}, initialState);

export default shareContentReducer;