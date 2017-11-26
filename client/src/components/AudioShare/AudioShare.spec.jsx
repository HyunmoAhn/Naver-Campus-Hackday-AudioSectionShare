import React from 'react';
import { shallow } from 'enzyme';

import AudioShare from './';

describe('<AudioShare />', () => {
	const mockId = 'mock-id';
	const mockStartTime = 15;
	const mockEndTime = 30;

	it('should match to snapthot when render default', () => {
		const wrapper = shallow(<AudioShare
			id={mockId}
			startTime={mockStartTime}
			endTime={mockEndTime}
		/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should setState value when onChange textarea', () => {
		const mockValue = 'mock-value';
		const wrapper = shallow(<AudioShare
			id={mockId}
		  startTime={mockStartTime}
		  endTime={mockEndTime}
		/>);
		const textarea = wrapper.find('textarea');

		textarea.simulate('change', {
			target: {
				value: mockValue,
			},
		});
		expect(wrapper.state().value).toEqual(mockValue);
	});

	it('should call onNaverShare when click .AudioShare__btn-naver', () => {
		const onNaverShare = jest.fn();
		const wrapper = shallow(<AudioShare
			id={mockId}
		  startTime={mockStartTime}
		  endTime={mockEndTime}
		  onNaverShare={onNaverShare}
		/>);
		const naverBtn = wrapper.find('.AudioShare__btn-naver');
		const { id, startTime, endTime } = wrapper.instance().props;
		const { value } = wrapper.state();

		naverBtn.simulate('click');
		expect(onNaverShare.mock.calls.length).toBe(1);
		expect(onNaverShare.mock.calls[0]).toEqual([id, startTime, endTime, value]);
	});

	it('should call onFacebookShare when click .AudioShare__btn-facebook', () => {
		const onFacebookShare = jest.fn();
		const wrapper = shallow(<AudioShare
			id={mockId}
		  startTime={mockStartTime}
		  endTime={mockEndTime}
		  onFacebookShare={onFacebookShare}
		/>);
		const facebookBtn = wrapper.find('.AudioShare__btn-facebook');
		const { id, startTime, endTime } = wrapper.instance().props;
		const { value } = wrapper.state();

		facebookBtn.simulate('click');
		expect(onFacebookShare.mock.calls.length).toBe(1);
		expect(onFacebookShare.mock.calls[0]).toEqual([id, startTime, endTime, value]);
	});
});