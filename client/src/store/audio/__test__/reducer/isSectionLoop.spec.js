import isSectionLoop from 'store/audio/reducer/isSectionLoop';
import * as actions from '../../actions';

describe('isSectionLoop reducer', () => {
	it('should return initialState', () => {
		expect(isSectionLoop(undefined, {})).toBe(false);
	});

	it('should handle audioSetTrueSectionLoop', () => {
		expect(isSectionLoop(undefined,
			actions.audioSetTrueSectionLoop()
		)).toBe(true);
	});

	it('should handle audioSetFalseSectionLoop', () => {
		expect(isSectionLoop(undefined,
			actions.audioSetFalseSectionLoop()
		)).toBe(false);
	});

	it('should handle audioToggleSectionLoop', () => {
		expect(isSectionLoop(false,
			actions.audioToggleSectionLoop(),
		)).toBe(true);

		expect(isSectionLoop(true,
			actions.audioToggleSectionLoop(),
		)).toBe(false);
	});
});