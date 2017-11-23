import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AudioPlayerTimeBox from '../AudioPlayerTimeBox';
import AudioPlayerVolumeBox from '../AudioPlayerVolumeBox';
import TimeScreen from '../TimeScreen';
import './AudioPlayer.scss'

const propTypes = {
	location: PropTypes.object,
	src: PropTypes.string,
};

const defaultProps = {
	location: {},
	src: 'https://s3.ap-northeast-2.amazonaws.com/music-sample/My+Chemical+Romance-08-Welcome+To+The+Black+Parade-320k.mp3',
};

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: 0,
			isMute: false,
			isLoop: false,
			isPause: true,
			isSetSection: false,
			isSectionLoop: !!props.location.query.startTime && props.location.query.endTime,
			volume: 50,
			startTime: props.location.query.startTime,
			endTime: props.location.query.endTime,
		};
		this.audio = new Audio(props.src);
		this.audio.autoplay = true;
		this.audio.onpause = () => {
			if (this.audio.currentTime === this.audio.duration) {
				this.audio.currentTime = 0;
			}
		};
		this.audio.ontimeupdate = () => {
			const { currentTime, startTime, endTime, isSectionLoop } = this.state;

			if (isSectionLoop) {
				if (startTime && currentTime < startTime) {
					this.audio.currentTime = startTime;
				}

				if (endTime && currentTime > endTime) {
					this.audio.currentTime = startTime;
				}
			}

			this.setState({
				currentTime: this.audio.currentTime,
			});
		};

		this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
		this.handleToggleMute = this.handleToggleMute.bind(this);
		this.handleTogglePlay = this.handleTogglePlay.bind(this);
		this.handleToggleLoop = this.handleToggleLoop.bind(this);
		this.handleSetSection = this.handleSetSection.bind(this);
		this.handleSectionLoopCancel = this.handleSectionLoopCancel.bind(this);
		this.handleVolumeChange = this.handleVolumeChange.bind(this);
	}

	componentWillUnmount() {
		this.audio.pause();
	}

	handleCurrentTimeChange(e) {
		const duration = this.audio.duration;
		const currentTime = e.target.value / 100 * duration;

		this.audio.currentTime = currentTime;
	}

	handleToggleMute() {
		this.setState({ isMute: !this.audio.muted });
		this.audio.muted = !this.audio.muted;
	}

	handleToggleLoop() {
		this.setState({ isLoop: !this.state.isLoop });
		this.audio.loop = !this.audio.loop;
	}

	handleTogglePlay() {
		this.setState({ isPause: !this.state.isPause });
		if (this.audio.paused) {
			this.audio.play();
		} else {
			this.audio.pause();
		}
	}

	handleSetSection() {
		const { startTime, isSetSection } = this.state;
		const currentTime = Math.round(this.audio.currentTime * 10) / 10;

		this.setState({ isSetSection: !isSetSection });
		if (!isSetSection) {
			this.setState({
				startTime: currentTime,
				endTime: null,
				isSectionLoop: false,
			});
		} else {
			if (currentTime < startTime) {
				this.setState({
					message: '시작시간보다 끝나는 시간이 빠릅니다.',
					startTime: null,
				}, () => {
					setTimeout(() => this.setState({ message: null }), 2000);
				});
				return null;
			}
			this.setState({
				endTime: currentTime,
				isSectionLoop: true,
			});
		}
	}

	handleSectionLoopCancel() {
		this.setState({
			isSectionLoop: false,
			startTime: null,
			endTime: null,
		});
	}

	handleVolumeChange(value) {
		if (this.audio.muted) {
			this.audio.muted = false;
		}
		this.setState({ volume: Number(value) });
		this.audio.volume = value / 100;
	}

	render() {
		const { volume } = this.state;
		const playBtnClassName = cx('fa', {
			'fa-play': this.audio.paused,
			'fa-pause': !this.audio.paused,
		});
		const loopBtnClassName = cx('fa', 'fa-retweet', {
			'active': this.audio.loop,
		});
		const sectionBtnClassName = cx('fa', 'fa-exchange', {
			'active': this.state.isSetSection,
		});

		if (!this.audio) {
			return <div>
				지원하지 않는 브라우저입니다.
			</div>;
		}

		return (
			<div className="AudioPlayer">
				{this.state.isSectionLoop &&
					<button
						className="AudioPlayer__section-loop-cancel"
					  type="button"
					  onClick={this.handleSectionLoopCancel}
					>
						<TimeScreen second={this.state.startTime} /> ~
						<TimeScreen second={this.state.endTime} />
						<br />
						반복 해제
					</button>
				}
				<button
					className="AudioPlayer__section-btn"
				  type="button"
				  onClick={this.handleSetSection}
				>
					<i className={sectionBtnClassName} />
				</button>
				<button
					className="AudioPlayer__play-btn"
					type="button"
					onClick={this.handleTogglePlay}
				>
					<i className={playBtnClassName} />
				</button>
				<button
					className="AudioPlayer__toggle-btn"
					type="button"
					onClick={this.handleToggleLoop}
				>
					<i className={loopBtnClassName} />
				</button>
				<AudioPlayerTimeBox
					currentTime={this.audio.currentTime}
				  duration={this.audio.duration}
				  onCurrentTimeChange={this.handleCurrentTimeChange}
				/>
				<AudioPlayerVolumeBox
					volume={this.audio.muted ? 0 : volume}
				  onToggleMute={this.handleToggleMute}
				  onVolumeChange={this.handleVolumeChange}
				/>
				{this.state.message &&
					<div className="AudioPlayer__message">
						{this.state.message}
					</div>
				}
			</div>
		)
	}
}

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer