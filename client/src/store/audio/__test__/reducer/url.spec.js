import url from 'store/audio/reducer/url';
import * as actions from '../../actions';

describe('url reducer', () => {
	const mockSrc = {
		src: 'mock-src',
	};

	it('should return initialState', () => {
		expect(url(undefined, {})).toBe('');
	});

	it('should call audioInformationSuccess', () => {
		expect(url(undefined,
			actions.audioInformationSuccess(mockSrc)
		)).toBe(mockSrc.src);
	});

	it('should call audioInformationUsedListSuccess', () => {
		expect(url(undefined,
			actions.audioInformationUsedListSuccess(mockSrc)
		)).toBe(mockSrc.src);
	});

	it('should call audioInformationRequest', () => {
		expect(url(undefined,
			actions.audioInformationRequest()
		)).toBe('');
	});

	it('should call audioInformationUsedListRequest', () => {
		expect(url(undefined,
			actions.audioInformationUsedListRequest()
		)).toBe('');
	});
});