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
				const sharedURL = `${API.CLIENT_URL}?id=${data.id}&endTime=${endTime}&startTime=${startTime}`;
				window.open(`http://share.naver.com/web/shareView.nhn?url=${encodeURI(encodeURIComponent(sharedURL))}&title=audio_share`);
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

export const {
	audioInformationUsedListRequest,
	audioInformationUsedListSuccess,
	audioInformationUsedListFailure,
} = createActions(
	TYPES.AUDIO_INFORMATION_USED_LIST_REQUEST,
	TYPES.AUDIO_INFORMATION_USED_LIST_SUCCESS,
	TYPES.AUDIO_INFORMATION_USED_LIST_FAILURE,
);

export const audioInformationUsedList = id => (dispatch, getState) => {
	if (selector.isFetchSelector(getState())) {
		return Promise.reject("audioInformation 중복요청");
	}

	dispatch(audioInformationUsedListRequest());

	return apiCall('/audio/info_list', {
		baseURL: API.AUDIO,
		params: {
			audio_id: id,
		},
	})
		.then(
			data => dispatch(audioInformationUsedListSuccess(data)),
			err => dispatch(audioInformationUsedListFailure(err)),
		);
};

export const {
	audioListFetchRequest,
	audioListFetchSuccess,
	audioListFetchFailure,
} = createActions(
	TYPES.AUDIO_LIST_FETCH_REQUEST,
	TYPES.AUDIO_LIST_FETCH_SUCCESS,
	TYPES.AUDIO_LIST_FETCH_FAILURE,
);

export const audioListFetch = () => (dispatch) => {
	dispatch(audioListFetchRequest());

	return apiCall('/audio/list', {
		baseURL: API.AUDIO,
	})
		.then(
			data => dispatch(audioListFetchSuccess(data)),
			err => dispatch(audioListFetchFailure(err)),
		);
};