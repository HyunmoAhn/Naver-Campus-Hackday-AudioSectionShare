import React from 'react';
import { shallow } from 'enzyme';

import AudioPlayerVolumeBox from './';

describe('<AudioPlayerVolumeBox />', () => {
	it('should match to snapshot when render default', () => {
		const wrapper = shallow(<AudioPlayerVolumeBox />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match volume-icon className when change props.volume', () => {
		const wrapper = shallow(<AudioPlayerVolumeBox />);
		let volumeIcon = wrapper.find('[data-name="volume-icon"]');

		wrapper.setProps({ volume: 0 });
		expect(volumeIcon.props().className).toBe('fa fa-volume-off');

		wrapper.setProps({ volume: 10 });
		volumeIcon = wrapper.find('[data-name="volume-icon"]');
		expect(volumeIcon.props().className).toBe('fa fa-volume-down');

		wrapper.setProps({ volume: 35 });
		volumeIcon = wrapper.find('[data-name="volume-icon"]');
		expect(volumeIcon.props().className).toBe('fa fa-volume-up');
	});

	it('should call onToggleMute when click .AudioPlayerVolumeBox__mute-btn', () => {
		const onToggleMute = jest.fn();
		const wrapper = shallow(<AudioPlayerVolumeBox onToggleMute={onToggleMute} />);
		const muteBtn = wrapper.find('.AudioPlayerVolumeBox__mute-btn');

		muteBtn.simulate('click');
		expect(onToggleMute.mock.calls.length).toBe(1);
	});

	it('should call onVolumeChange when change .range', () => {
		const onVolumeChange = jest.fn();
		const wrapper = shallow(<AudioPlayerVolumeBox onVolumeChange={onVolumeChange} />);
		const range = wrapper.find('.range');

		range.simulate('change', {
			target: {
				value: 50,
			},
		});

		expect(onVolumeChange.mock.calls.length).toBe(1);
		expect(onVolumeChange.mock.calls[0]).toEqual([50]);
	});
});