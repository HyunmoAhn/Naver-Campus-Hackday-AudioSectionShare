import Immutable from 'immutable';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as API from 'constants/API_ROOT';
import * as actions from '../actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('create action audioInformation', () => {
	const mockResponse = {
		 info: 'mock-info',
		 src: 'mock-src',
		 title: 'mock-title',
	};
	const mockId = 'mock-id';

	it('should block action when call the same time', () => {
		const expectActions = [];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: true,
			},
		}));

		return store.dispatch(actions.audioInformation())
			.catch(() => expect(store.getActions(expectActions)));
	});

	it('should act success when success callApi', () => {

		nock(API.AUDIO)
			.get('/audio/info_share')
			.query({
				share_id: mockId,
			})
			.reply(200, mockResponse);

		const expectActions = [
			actions.audioInformationRequest(),
			actions.audioInformationSuccess(mockResponse),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.audioInformation(mockId))
			.then(() => expect(store.getActions()).toEqual(expectActions));
	});

	it('should act failure when fail callApi', () => {
		const errorMessage = 'error-message';

		nock(API.AUDIO)
			.get('/audio/info_share')
			.query({
				share_id: mockId,
			})
			.replyWithError(errorMessage);

		const expectActions = [
			actions.audioInformationRequest(),
			actions.audioInformationFailure(new Error(errorMessage)),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.audioInformation(mockId))
			.then(() => expect(store.getActions()).toEqual(expectActions));
	});
});

describe('create action naverShareInformation', () => {
	const mockId = 'mock-id';
	const mockContent = 'mock-content';
	const mockStartTime = 10;
	const mockEndTime = 30;

	it('should block when call the same time', () => {
		const expectActions = [];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: true,
			},
		}));

		return store.dispatch(actions.naverShareInformation())
			.catch(() => expect(store.getActions(expectActions)));
	});

	it('should call success when success apiCall', () => {
		const responseData = {
			id: 5,
		};

		nock(API.AUDIO)
			.post('/audio/share', {
				id: mockId,
				content: mockContent,
				startTime: mockStartTime,
				endTime: mockEndTime,
			})
			.reply(200, responseData);

		const expectActions = [
			actions.audioShareInformationRequest(),
			actions.audioShareInformationSuccess(responseData),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.naverShareInformation(mockId, mockStartTime, mockEndTime, mockContent))
			.then(() => expect(store.getActions(expectActions)));
	});

	it('should call failure when fail apiCall', () => {
		const errorMessage = 'error-message';

		nock(API.AUDIO)
			.post('/audio/share', {
				id: mockId,
				content: mockContent,
				startTime: mockStartTime,
				endTime: mockEndTime,
			})
			.replyWithError(errorMessage);

		const expectActions = [
			actions.audioShareInformationRequest(),
			actions.audioShareInformationFailure(new Error(errorMessage)),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.naverShareInformation(mockId, mockStartTime, mockEndTime, mockContent))
			.then(() => expect(store.getActions(expectActions)));
	});
});

describe('create action faceBookShareInformation', () => {
	const mockId = 'mock-id';
	const mockContent = 'mock-content';
	const mockStartTime = 10;
	const mockEndTime = 20;

	it('should call block when call the same time', () => {
		const expectActions = [];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: true,
			},
		}));

		return store.dispatch(actions.faceBookShareInformation())
			.catch(() => expect(store.getActions()).toEqual(expectActions));
	});

	it('should call success when success apiCall', () => {
		const responseData = {
			id: 5,
		};

		nock(API.AUDIO)
			.post('/audio/share', {
				id: mockId,
				content: mockContent,
				startTime: mockStartTime,
				endTime: mockEndTime,
			})
			.reply(200, responseData);

		const expectActions = [
			actions.audioShareInformationRequest(),
			actions.audioShareInformationSuccess(responseData),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.faceBookShareInformation(
			mockId,
			mockStartTime,
			mockEndTime,
			mockContent,
		)).then(() => expect(store.getActions()).toEqual(expectActions));
	});

	it('should call failure when fail apiCall', () => {
		const errorMessage = 'error-message';

		nock(API.AUDIO)
			.post('/audio/share', {
				id: mockId,
				content: mockContent,
				startTime: mockStartTime,
				endTime: mockEndTime,
			})
			.replyWithError(errorMessage);

		const expectActions = [
			actions.audioShareInformationRequest(),
			actions.audioShareInformationFailure(new Error(errorMessage)),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.faceBookShareInformation(
			mockId,
			mockStartTime,
			mockEndTime,
			mockContent,
		)).then(() => expect(store.getActions()).toEqual(expectActions));
	});
});

describe('create action audioInformationUsedList', () => {
	const mockId = 'mock-id';

	it('should call block when call the same time', () => {
		const expectActions = [];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: true,
			},
		}));

		return store.dispatch(actions.audioInformationUsedList())
			.catch(() => expect(store.getActions()).toEqual(expectActions));
	});

	it('should call success when success callApi', () => {
		const responseData = {
			info: 'mock-info',
			src: 'mock-src',
			title: 'mock-title',
		};

		nock(API.AUDIO)
			.get('/audio/info_list')
			.query({ audio_id: mockId })
			.reply(200, responseData);

		const expectActions = [
			actions.audioInformationUsedListRequest(),
			actions.audioInformationUsedListSuccess(responseData),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.audioInformationUsedList(mockId))
			.then(() => expect(store.getActions()).toEqual(expectActions));
	});

	it('should call failure when fail callApi', () => {
		const errorMessage = 'error-message';

		nock(API.AUDIO)
			.get('/audio/info_list')
			.query({ audio_id: mockId })
			.replyWithError(errorMessage);

		const expectActions = [
			actions.audioInformationUsedListRequest(),
			actions.audioInformationUsedListFailure(new Error(errorMessage)),
		];

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		return store.dispatch(actions.audioInformationUsedList(mockId))
			.then(() => expect(store.getActions()).toEqual(expectActions));
	});
});

describe('create action audioListFetch', () => {
	it('should call success when success apiCall', () => {
		const responseData = [
			{
				count: 5,
				id: 1,
				title: 'mock-title-1',
			},
			{
				count: 4,
				id: 2,
				title: 'mock-title-2',
			},
		];

		nock(API.AUDIO)
			.get('/audio/list')
			.reply(200, responseData);

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		const expectActions = [
			actions.audioListFetchRequest(),
			actions.audioListFetchSuccess(responseData),
		];

		return store.dispatch(actions.audioListFetch())
			.then(() => expect(store.getActions()).toEqual(expectActions));
	});

	it('should call failure when fail apiCall', () => {
		const errorMessage = 'error-message';

		nock(API.AUDIO)
			.get('/audio/list')
			.replyWithError(errorMessage);

		const store = mockStore(Immutable.fromJS({
			audio: {
				isFetch: false,
			},
		}));

		const expectActions = [
			actions.audioListFetchRequest(),
			actions.audioListFetchFailure(new Error(errorMessage)),
		];

		return store.dispatch(actions.audioListFetch())
			.then(() => expect(store.getActions()).toEqual(expectActions));
	});
});
