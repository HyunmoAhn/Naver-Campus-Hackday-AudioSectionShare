import React from 'react';
import { shallow } from 'enzyme';

import TimeScreen from './';

describe('<TimeScreen />', () => {
	it('should match snapshot when render default', () => {
		const wrapper = shallow(<TimeScreen />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match snapshot when props.second is NaN', () => {
		const wrapper = shallow(<TimeScreen second={0 / 0} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match snapshot when remainSecond >= 10', () => {
		const wrapper = shallow(<TimeScreen second={35} />);

		expect(wrapper).toMatchSnapshot();
	});
});