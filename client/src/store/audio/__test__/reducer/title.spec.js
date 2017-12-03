import title from 'store/audio/reducer/title';
import * as actions from '../../actions';

describe('title reducer', () => {
	it('should return initialState', () => {
		expect(title(undefined, {})).toBe('');
	});

	it('should call audioInformationSuccess', () => {
		const mockTitle = {
			title: 'mock-title',
		};

		expect(title(undefined,
			actions.audioInformationSuccess(mockTitle)
		)).toBe(mockTitle.title);
	});

	it('should call audioInformationUsedListSuccess', () => {
		const mockTitle = {
			title: 'mock-title',
		};

		expect(title(undefined,
			actions.audioInformationUsedListSuccess(mockTitle)
		)).toBe(mockTitle.title);
	});
});