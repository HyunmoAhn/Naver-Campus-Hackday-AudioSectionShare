import React from 'react';
import { shallow, mount } from 'enzyme';

import AudioList from './';
import AudioListItem from '../AudioListItem';

describe('<AudioList />', () => {
	const mockList = [
		{
			title: 'mock-title-1',
			id: 'mock-id-1',
			count: 5,
		},
		{
			title: 'mock-title-2',
			id: 'mock-id-2',
			count: 10,
		},
	];

	it('should match to snapshot when render default', () => {
		const wrapper = shallow(<AudioList list={mockList} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call props.onListFetch when componentDidMount', () => {
		const onListFetch = jest.fn();
		const wrapper = mount(<AudioList list={mockList} onListFetch={onListFetch} />);

		expect(onListFetch.mock.calls.length).toBe(1);
	});

	it('should call collect when props.onListInfo of AudioListItem', () => {
		const onListInfo = jest.fn();
		const onSetFalseSectionLoop = jest.fn();
		const wrapper = shallow(<AudioList
			list={mockList}
		  onListInfo={onListInfo}
		  onSetFalseSectionLoop={onSetFalseSectionLoop}
		/>);
		const audioListItem = wrapper.find(AudioListItem).at(0);

		audioListItem.props().onListInfo(audioListItem.props().item.id);
		expect(onListInfo.mock.calls.length).toBe(1);
		expect(onListInfo.mock.calls[0]).toEqual([audioListItem.props().item.id]);
		expect(onSetFalseSectionLoop.mock.calls.length).toBe(1);
	});
});