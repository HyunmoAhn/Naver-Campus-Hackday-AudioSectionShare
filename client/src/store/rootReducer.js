import { combineReducers } from 'redux-immutable';
import audio from './audio/reducer';

const rootReducer = combineReducers({
	audio,
});

export default rootReducer;