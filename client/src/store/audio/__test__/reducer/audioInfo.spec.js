import * as actions from '../../actions';
import audioInfo from 'store/audio/reducer/audioInfo';

describe('audioInfo reducer', () => {
	it('should return initialState', () => {
		expect(audioInfo(undefined, {})).toBe('');
	});

	it('should handle audioInformationSuccess', () => {
		const mockActionData = {
			info: 'mock-info',
		};

		expect(audioInfo(undefined,
			actions.audioInformationSuccess(mockActionData),
		)).toBe(mockActionData.info);
	});

	it('should handle audioInformationUsedListSuccess', () => {
		const mockActionData = {
			info: 'mock-info',
		};

		expect(audioInfo(undefined,
			actions.audioInformationUsedListSuccess(mockActionData),
		)).toBe(mockActionData.info);
	});
});