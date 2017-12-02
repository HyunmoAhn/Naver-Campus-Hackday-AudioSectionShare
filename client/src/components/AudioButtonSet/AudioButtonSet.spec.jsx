import React from 'react';
import { shallow } from 'enzyme';

import AudioButtonSet from './';

describe('<AudioButtonSet />', () => {
	it('should match snapshot when render default', () => {
		const wrapper = shallow(<AudioButtonSet />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match snapshot when props.isSelectionLoop === true', () => {
		const wrapper = shallow(<AudioButtonSet
			isSectionLoop
		/>);

		expect(wrapper).toMatchSnapshot();
	})
});