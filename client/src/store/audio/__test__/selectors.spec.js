import Immutable from 'immutable';
import * as selector from 'store/audio/selectors';

const mockState = Immutable.fromJS({
	audio: {
		audioInfo: 'mock-audio-info',
		isFetch: false,
		isSectionLoop: false,
		list: [
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
		],
		shareContent: 'mock-share-content',
		title: 'mock-title',
		url: 'mock-url',
	},
});

const audio = mockState.get('audio');

describe('audio selectors', () => {
	it('should match audioInfo Selector', () => {
		expect(selector.audioInfoSelector(mockState))
			.toBe(audio.get('audioInfo'))
	});

	it('should match isFetch Selector', () => {
		expect(selector.isFetchSelector(mockState))
			.toBe(audio.get('isFetch'))
	});
	it('should match isSectionLoop Selector', () => {
		expect(selector.isSectionLoopSelector(mockState))
			.toBe(audio.get('isSectionLoop'))
	});
	it('should match list Selector', () => {
		expect(selector.listSelector(mockState))
			.toEqual(audio.get('list'))
	});
	it('should match shareContent Selector', () => {
		expect(selector.shareContentSelector(mockState))
			.toBe(audio.get('shareContent'))
	});
	it('should match title Selector', () => {
		expect(selector.titleSelector(mockState))
			.toBe(audio.get('title'))
	});
	it('should match url Selector', () => {
		expect(selector.urlSelector(mockState))
			.toBe(audio.get('url'))
	});
});