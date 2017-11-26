import React from 'react';
import { shallow } from 'enzyme';

import AudioListItem from './';

describe('<AudioListItem />', () => {
	const mockItem = {
		title: 'mock-title',
		id: 'mock-id',
		count: 5,
	};

	it('should match to snapshot when render default', () => {
		const wrapper = shallow(<AudioListItem item={mockItem} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call onListInfo and router.push when click .AudioListItem', () => {
		const onListInfo = jest.fn();
		const mockRouter = {
			push: () => false,
		};
		const wrapper = shallow(<AudioListItem
			item={mockItem}
			router={mockRouter}
			onListInfo={onListInfo}
		/>);
		const routerPush = jest.spyOn(mockRouter, 'push');
		const listItem = wrapper.find('.AudioListItem');

		listItem.simulate('click');
		expect(onListInfo.mock.calls.length).toBe(1);
		expect(onListInfo.mock.calls[0]).toEqual([wrapper.instance().props.item.id]);
		expect(routerPush.mock.calls.length).toBe(1);
		expect(routerPush.mock.calls[length])
			.toEqual([`?id=${wrapper.instance().props.item.id}&isList=true`]);
	});
});