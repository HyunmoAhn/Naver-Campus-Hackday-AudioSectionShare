import { createActions } from 'redux-actions';
import apiCall from 'api';
import * as API from 'constants/API_ROOT';
import * as TYPES from '../actionTypes';
import * as selector from './selectors';

export const {
	audioInformationRequest,
	audioInformationSuccess,
	audioInformationFailure,
} = createActions(
	TYPES.AUDIO_INFORMATION_REQUEST,
	TYPES.AUDIO_INFORMATION_SUCCESS,
	TYPES.AUDIO_INFORMATION_FAILURE,
);

export const audioInformation = id => (dispatch, getState) => {
	if (selector.isFetchSelector(getState())) {
		return Promise.reject("audioInformation 중복요청");
	}

	dispatch(audioInformationRequest());

	return apiCall('/audio/info_list', {
		baseURL: API.AUDIO,
		params: {
			audio_id: id,
		},
	})
		.then(
			data => dispatch(audioInformationSuccess(data)),
			err => dispatch(audioInformationFailure(err)),
		);
};