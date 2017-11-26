import React from 'react';
import { shallow } from 'enzyme';

import AudioPlayerTimeBox from './';

describe('<AudioPlayerTimeBox />', () => {
	it('should match to snapshot when render default', () => {
		const wrapper = shallow(<AudioPlayerTimeBox />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call onCurrentTImeChange when ca', () => {
		const onCurrentTimeChange = jest.fn();
		const wrapper = shallow(<AudioPlayerTimeBox
			onCurrentTimeChange={onCurrentTimeChange}
		/>);
		const range = wrapper.find('.range');

		range.simulate('change');
		expect(onCurrentTimeChange.mock.calls.length).toBe(1);
	});
});