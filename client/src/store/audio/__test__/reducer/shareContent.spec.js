import shareContent from 'store/audio/reducer/shareContent';
import * as actions from '../../actions';

describe('shareContent reducer', () => {
	it('should return initialState', () => {
		expect(shareContent(undefined, {})).toBe('');
	});

	it('should handle audioInformationSuccess', () => {
		const mockContent = {
			content: 'mock-content',
		};
		expect(shareContent(undefined,
			actions.audioInformationSuccess({}),
		)).toBe('');

		expect(shareContent(undefined,
			actions.audioInformationSuccess(mockContent),
		)).toBe(mockContent.content);
	});
});