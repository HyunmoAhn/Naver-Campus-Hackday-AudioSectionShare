import React from 'react';
import { shallow, mount } from 'enzyme';

import AudioPlayerTimeBox from 'components/AudioPlayerTimeBox';
import AudioButtonSet from 'components/AudioButtonSet';
import AudioVolumeBox from 'components/AudioPlayerVolumeBox';
import AudioPlayer from './';

describe('<AudioPlayer />', () => {
	const mockUrl = 'http://mock-url.mock';
	it('should match to snapshot when render default', () => {
		const wrapper = shallow(<AudioPlayer />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match to snapshot when exist props.url', () => {
		const wrapper = shallow(<AudioPlayer url={mockUrl} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match to snapshot when exist state.message', () => {
		const wrapper = shallow(<AudioPlayer url={mockUrl} />);
		wrapper.setState({ message: 'mock-message' });

		expect(wrapper).toMatchSnapshot();
	});

	it('should match to snapshot when props.audioInfo', () => {
		const mockAudioInfo = 'mock-audio-info';
		const wrapper = shallow(<AudioPlayer url={mockUrl} audioInfo={mockAudioInfo} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should match to snapshot when shareContent', () => {
		const mockShareContent = 'mock-share-content';
		const wrapper = shallow(<AudioPlayer url={mockUrl} shareContent={mockShareContent} />);

		expect(wrapper).toMatchSnapshot();
	});

	describe('should test when call componentDidMount', () => {
		it('should call props.onSetTrueSectionLoop when exist startTime and endTime', () => {
			const mockLocation = {
				query: {
					startTime: 10,
					endTime: 20,
				},
			};
			const onSetTrueSectionLoop = jest.fn();
			mount(<AudioPlayer
				location={mockLocation}
				onSetTrueSectionLoop={onSetTrueSectionLoop}
			/>);

			expect(onSetTrueSectionLoop.mock.calls.length).toBe(1);
		});

		it('should call props.onFetchAudioInfo when exist id and isList === false', () => {
			const mockLocation = {
				query: {
					id: 5,
					isList: false,
				},
			};
		const onFetchAudioInfo = jest.fn();
		mount(<AudioPlayer location={mockLocation} onFetchAudioInfo={onFetchAudioInfo} />);

		expect(onFetchAudioInfo.mock.calls.length).toEqual(1);
		expect(onFetchAudioInfo.mock.calls[0]).toEqual([mockLocation.query.id]);
		});
	});

	describe('should test when call componentWillReceiveProps', () => {
		it('should call correct in onPause when this.audio.currentTime === this.audio.duration', () => {
			const wrapper = mount(<AudioPlayer />);
			let audio = wrapper.instance().audio;

			wrapper.setProps({ url: 'mock-url' });
			audio = wrapper.instance().audio;
			audio.currentTime = 100;
			audio.onpause();
			expect(audio.currentTime).toBe(100);
			audio.currentTime = audio.duration;
			audio.onpause();

			expect(audio.currentTime).toBe(0);
		});

		describe('should call correct in ontimeupdate', () => {
			const wrapper = mount(<AudioPlayer />);
			let audio = wrapper.instance().audio;
			wrapper.setProps({ url: 'mock-url' });
			audio = wrapper.instance().audio;

			describe('when if props.isSectionLoop === true', () => {
				wrapper.setProps({ isSectionLoop: true });
				it('when if audio.currentTime < startTime', () => {
					wrapper.instance().audio.currentTime = 10;
					wrapper.setState({ startTime: 30 });
					audio.ontimeupdate();
					expect(wrapper.instance().audio.currentTime).toBe(30);
					expect(wrapper.instance().state.currentTime).toBe(30);
				});

				it('when if audio.currentTime >= startTime', () => {
					wrapper.instance().audio.currentTime = 100;
					wrapper.setState({ startTime: 30, endTime: 150 });
					audio.ontimeupdate();
					expect(wrapper.instance().audio.currentTime).toBe(100);
					expect(wrapper.instance().state.currentTime).toBe(100);
				});
			});

			it('when if props.isSectionLoop === true and audio.currentTIme > endTime', () => {
				wrapper.setProps({ isSectionLoop: true });
				audio.currentTime = 100;
				wrapper.setState({ startTime: 30, endTime: 50 });
				audio.ontimeupdate();
				expect(wrapper.instance().audio.currentTime).toBe(30);
				expect(wrapper.instance().state.currentTime).toBe(30);
			});

			it('when if props.isSectionLoop !== true', () => {
				wrapper.setProps({ isSectionLoop: false });
				wrapper.instance().audio.currentTime = 150;
				audio.ontimeupdate();
				expect(wrapper.instance().state.currentTime).toBe(150);
			});
		});

		it('should call handleCurrentTimeChange when call AudioPlayerTimeBox.onCurrentTimeChange', () => {
			const handleCurrentTimeChange = jest.spyOn(AudioPlayer.prototype, 'handleCurrentTimeChange');
			const wrapper = shallow(<AudioPlayer url={mockUrl} />);
			const audioPlayerTimeBox = wrapper.find(AudioPlayerTimeBox);
			const duration = wrapper.instance().audio.duration;
			const mockEvent = {
				target: {
					value: 100,
				},
			};
			const currentTime = mockEvent.target.value / 100 * duration;
			audioPlayerTimeBox.props().onCurrentTimeChange(mockEvent);

			expect(handleCurrentTimeChange.mock.calls.length).toBe(1);
			expect(handleCurrentTimeChange.mock.calls[0]).toEqual([mockEvent]);
			expect(wrapper.instance().audio.currentTime).toBe(currentTime);
		});

		describe('test AudioButtonSet Component Event', () => {
			const onSetFalseSectionLoop = jest.fn();
			const onSetTrueSectionLoop = jest.fn();
			const handleSectionLoopCancel = jest.spyOn(AudioPlayer.prototype, 'handleSectionLoopCancel');
			const handleSetSection = jest.spyOn(AudioPlayer.prototype, 'handleSetSection');
			const handleShareSetting = jest.spyOn(AudioPlayer.prototype, 'handleShareSetting');
			const handleToggleLoop = jest.spyOn(AudioPlayer.prototype, 'handleToggleLoop');
			const handleTogglePlay = jest.spyOn(AudioPlayer.prototype, 'handleTogglePlay');
			const wrapper = shallow(<AudioPlayer
				url={mockUrl}
			  onSetFalseSectionLoop={onSetFalseSectionLoop}
				onSetTrueSectionLoop={onSetTrueSectionLoop}
			/>);
			const audioButtonSet = wrapper.find(AudioButtonSet);

			it('should call handleSectionLoopCancel when call onSectionLoopCancel', () => {
				audioButtonSet.props().onSectionLoopCancel();

				expect(handleSectionLoopCancel.mock.calls.length).toBe(1);
				expect(wrapper.state().startTime).toBe(null);
				expect(wrapper.state().endTime).toBe(null);
				expect(onSetFalseSectionLoop.mock.calls.length).toBe(1);
				onSetFalseSectionLoop.mockClear();
			});

			describe('should call handleSetSection when call onSetSection', () => {
				wrapper.instance().audio.currentTime = 10.555;
				const currentTime = Math.round(wrapper.instance().audio.currentTime * 10) / 10;

				it('when isSetSection === false', () => {
					wrapper.setState({ isSetSection: false });
					audioButtonSet.props().onSetSection();

					expect(handleSetSection.mock.calls.length).toBe(1);
					expect(wrapper.state().isSetSection).toBe(true);
					expect(wrapper.state().startTime).toBe(currentTime);
					expect(wrapper.state().endTime).toBe(null);
					expect(onSetFalseSectionLoop.mock.calls.length).toBe(1);
					onSetFalseSectionLoop.mockClear();
					handleSetSection.mockClear();
				});

				it('when isSection === true', () => {
					wrapper.setState({ isSetSection: true });
					audioButtonSet.props().onSetSection();

					expect(handleSetSection.mock.calls.length).toBe(1);
					expect(wrapper.state().isSetSection).toBe(false);
					expect(wrapper.state().endTime).toBe(currentTime);
					expect(onSetTrueSectionLoop.mock.calls.length).toBe(1);

					handleSetSection.mockClear();
					onSetTrueSectionLoop.mockClear();
				});

				it('when isSection === true and currentTime < startTime', () => {
					wrapper.setState({
						isSetSection: true,
						startTime: 15,
					});
					audioButtonSet.props().onSetSection();

					expect(handleSetSection.mock.calls.length).toBe(1);
					expect(wrapper.state().message).toBe('시작시간보다 끝나는 시간이 빠릅니다.');
					expect(wrapper.state().startTime).toBe(null);
					handleSetSection.mockClear();
				});
			});

			it('should call handleShareSetting when call onShareSetting', () => {
				wrapper.setProps({
					location: {
						query: {
							id: 'mock-id'
						},
					},
					isSectionLoop: true,
				});
				wrapper.setState({
					startTime: 10,
					isShare: true,
				});
				audioButtonSet.props().onShareSetting();
				expect(wrapper.state().isShare).toBe(false);

				wrapper.setProps({
					isSectionLoop: false,
				});
				audioButtonSet.props().onShareSetting();
				expect(wrapper.state().message).toBe('공유 구간을 설정해 주세요.');
			});

			it('should call handleToggleLoop when call onToggleLoop', () => {
				wrapper.instance().audio.loop = false;
				audioButtonSet.props().onToggleLoop();

				expect(handleToggleLoop.mock.calls.length).toBe(1);
				expect(wrapper.instance().audio.loop).toBe(true);
				handleToggleLoop.mockClear();
			});

			it.skip('should call handleTogglePlay when call onTogglePlay', () => {});

			describe('simulate AudioPlayerVolumeBox.props', () => {
				const handleToggleMute = jest.spyOn(AudioPlayer.prototype, 'handleToggleMute');
				const handleVolumeChange = jest.spyOn(AudioPlayer.prototype, 'handleVolumeChange');
				const wrapper = shallow(<AudioPlayer url={mockUrl} />);
				const volumeBox = wrapper.find(AudioVolumeBox);

				it('should call handleToggleMute when simulate onToggleMute', () => {
					volumeBox.props().onToggleMute();

					expect(handleToggleMute.mock.calls.length).toBe(1);
					expect(wrapper.instance().audio.muted).toBe(true);
				});

				it('should call handleVolumeChange when simulate onVolumeChange', () => {
					const mockVolume = 50.534;
					volumeBox.props().onVolumeChange(mockVolume);

					expect(wrapper.instance().audio.muted).toBe(false);
					expect(wrapper.state().volume).toBe(Number(mockVolume));
					expect(wrapper.instance().audio.volume).toBe(mockVolume / 100);
				});
			});
		});
	})
});