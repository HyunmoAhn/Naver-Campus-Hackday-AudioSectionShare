import isFetch from 'store/audio/reducer/isFetch';
import * as actions from '../../actions';

describe('isFetch reducer', () => {
	it('should return initialState', () => {
		expect(isFetch(undefined, {})).toBe(false);
	});

	it('should handle audioInformationRequest', () => {
		expect(isFetch(undefined, actions.audioInformationRequest()))
			.toBe(true);
	});

	it('should handle audioShareInformationRequest', () => {
		expect(isFetch(undefined, actions.audioShareInformationRequest()))
			.toBe(true);
	});

	it('should handle audioInformationUsedListRequest', () => {
		expect(isFetch(undefined, actions.audioInformationUsedListRequest()))
			.toBe(true);
	});

	it('should handle audioInformationSuccess', () => {
		expect(isFetch(undefined, actions.audioInformationSuccess()))
			.toBe(false);
	});

	it('should handle audioInformationFailure', () => {
		expect(isFetch(undefined, actions.audioInformationFailure()))
			.toBe(false);
	});

	it('should handle audioShareInformationSuccess', () => {
		expect(isFetch(undefined, actions.audioShareInformationSuccess()))
			.toBe(false);
	});

	it('should handle audioShareInformationFailure', () => {
		expect(isFetch(undefined, actions.audioShareInformationFailure()))
			.toBe(false);
	});

	it('should handle audioInformationUsedListSuccess', () => {
		expect(isFetch(undefined, actions.audioInformationUsedListSuccess()))
			.toBe(false);
	});

	it('should handle audioInformationUsedListFailure', () => {
		expect(isFetch(undefined, actions.audioInformationUsedListFailure()))
			.toBe(false);
	});
});