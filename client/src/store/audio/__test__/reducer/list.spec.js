import list from 'store/audio/reducer/list';
import * as actions from '../../actions';

describe('list reducer', () => {
	it('should return initialState', () => {
		expect(list(undefined, {})).toEqual([]);
	});

	it('should handle audioListFetchSuccess', () => {
		const mockList = [
			{
				count: 7,
				id: 1,
				title: "제가 맛 좀 볼 수 있을까요? - 오늘의 영화 회화"
			},
			{
				count: 3,
				id: 2,
				title: "나 곧 결혼하게 됐어. - 오늘의 영화 회화"
			}
		];
		expect(list(undefined,
			actions.audioListFetchSuccess(mockList)
		)).toEqual(mockList);
	});
});