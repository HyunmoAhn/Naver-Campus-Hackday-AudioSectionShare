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

	return apiCall('/audio/info_share', {
		baseURL: API.AUDIO,
		params: {
			share_id: id,
		},
	})
		.then(
			data => dispatch(audioInformationSuccess(data)),
			err => dispatch(audioInformationFailure(err)),
		);
};

export const {
	audioShareInformationRequest,
	audioShareInformationSuccess,
	audioShareInformationFailure,
} = createActions(
	TYPES.AUDIO_SHARE_INFORMATION_REQUEST,
	TYPES.AUDIO_SHARE_INFORMATION_SUCCESS,
	TYPES.AUDIO_SHARE_INFORMATION_FAILURE,
);

export const naverShareInformation = (id, startTime, endTime, content)=> (dispatch, getState) => {
	if (selector.isFetchSelector(getState())) {
		return Promise.reject();
	}

	dispatch(audioShareInformationRequest());

	return apiCall('/audio/share', {
		method: 'post',
		baseURL: API.AUDIO,
		data: {
			id,
			content,
			startTime,
			endTime,
		},
	})
		.then(
			(data) => {
				dispatch(audioShareInformationSuccess(data));
				const sharedURL = `${API.CLIENT_URL}?id=${data.id}&title=audio_share&endTime=${endTime}&startTime=${startTime}`;
				window.open(`http://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(sharedURL)}`);
			},
			(error) => {
				dispatch(audioShareInformationFailure(error));
			}
		);
};

export const faceBookShareInformation = (id, startTime, endTime, content)=> (dispatch, getState) => {
	if (selector.isFetchSelector(getState())) {
		return Promise.reject();
	}

	dispatch(audioShareInformationRequest());

	return apiCall('/audio/share', {
		method: 'post',
		baseURL: API.AUDIO,
		data: {
			id,
			content,
			startTime,
			endTime,
		},
	})
		.then(
			(data) => {
				dispatch(audioShareInformationSuccess(data));
				const sharedURL = `${API.CLIENT_URL}?id=${data.id}&endTime=${endTime}&startTime=${startTime}`;
				window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedURL)}&amp;src=sdkpreparse`)
			},
			(error) => {
				dispatch(audioShareInformationFailure(error));
			}
		);
};