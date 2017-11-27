import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AudioPlayerTimeBox from '../AudioPlayerTimeBox';
import AudioPlayerVolumeBox from '../AudioPlayerVolumeBox';
import AudioShare from '../AudioShare';
import TimeScreen from '../TimeScreen';
import './AudioPlayer.scss'

const propTypes = {
	audioInfo: PropTypes.string,
	isSectionLoop: PropTypes.bool,
	shareContent: PropTypes.string,
	title: PropTypes.string,
	url: PropTypes.string,
	location: PropTypes.object,
	src: PropTypes.string,
	onFetchAudioInfo: PropTypes.func,
	onShareNaver: PropTypes.func,
	onShareFacebook: PropTypes.func,
	onSetTrueSectionLoop: PropTypes.func,
	onSetFalseSectionLoop: PropTypes.func,
	onToggleSectionLoop: PropTypes.func,
};

const defaultProps = {
	audioInfo: '',
	isSectionLoop: false,
	shareContent: '',
	title: '',
	url: '',
	location: { query: {} },
	onFetchAudioInfo() {},
	onShareNaver() {},
	onShareFacebook() {},
	onSetTrueSectionLoop() {},
	onSetFalseSectionLoop() {},
	onToggleSectionLoop() {},
};

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: Number(props.location.query.startTime) || 0,
			isMute: false,
			isLoop: false,
			isPause: true,
			isSetSection: false,
			isSectionLoop: !!props.location.query.startTime && !!props.location.query.endTime,
			isShare: false,
			volume: 50,
			startTime: Number(props.location.query.startTime),
			endTime: Number(props.location.query.endTime),
		};
		this.audio = new Audio();
		this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
		this.handleToggleMute = this.handleToggleMute.bind(this);
		this.handleTogglePlay = this.handleTogglePlay.bind(this);
		this.handleToggleLoop = this.handleToggleLoop.bind(this);
		this.handleSetSection = this.handleSetSection.bind(this);
		this.handleSectionLoopCancel = this.handleSectionLoopCancel.bind(this);
		this.handleVolumeChange = this.handleVolumeChange.bind(this);
	}

	componentDidMount() {
		const { id, isList } = this.props.location.query;

		if (!!this.props.location.query.startTime &&
			!!this.props.location.query.endTime) {
			this.props.onSetTrueSectionLoop()
		}

		if (id && !isList) {
			this.props.onFetchAudioInfo(id);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.audio.pause();
		this.audio = new Audio(nextProps.url);
		this.audio.autoplay = true;
		this.audio.volume = this.state.volume / 100;
		this.audio.onpause = () => {
			if (this.audio.currentTime === this.audio.duration) {
				this.audio.currentTime = 0;
			}
		};
		this.audio.ontimeupdate = () => {
			const { currentTime, startTime, endTime } = this.state;
			const { isSectionLoop } = this.props;

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
			});
			this.props.onSetFalseSectionLoop();
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
			});
			this.props.onSetTrueSectionLoop();
		}
	}

	handleSectionLoopCancel() {
		this.setState({
			startTime: null,
			endTime: null,
		});
		this.props.onSetFalseSectionLoop();
	}

	handleVolumeChange(value) {
		if (this.audio.muted) {
			this.audio.muted = false;
		}
		this.setState({ volume: Number(value) });
		this.audio.volume = value / 100;
	}

	render() {
		const {
			endTime,
			isSetSection,
			isShare,
			message,
			startTime,
			volume,
		} = this.state;
		const {
			audioInfo,
			isSectionLoop,
			shareContent,
			title,
			location,
			url,
			onShareFacebook,
			onShareNaver,
		} = this.props;

		const playBtnClassName = cx('fa', {
			'fa-play': this.audio.paused,
			'fa-pause': !this.audio.paused,
		});
		const loopBtnClassName = cx('fa', 'fa-retweet', {
			'active': this.audio.loop,
		});
		const sectionBtnClassName = cx('fa', 'fa-exchange', {
			'active': isSetSection,
		});

		if (!url) {
			return <div>
				잠시만 기다려 주세요.
			</div>;
		}

		return (
			<div className="AudioPlayer">
				<div className="AudioPlayer__title">
					{title}
				</div>
				{isSectionLoop &&
					<button
						className="AudioPlayer__section-loop-cancel"
					  type="button"
					  onClick={this.handleSectionLoopCancel}
					>
						<TimeScreen second={startTime} />
						~
						<TimeScreen second={endTime} />
						<br />
						반복 해제
					</button>
				}
				<button
					className="AudioPlayer__section-btn"
					disabled={isSectionLoop}
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
				<button
					className="AudioPlayer__share-btn"
				  type="button"
				  onClick={() => {
				  	if (!isSectionLoop) {
				  		this.setState({ message: '공유 구간을 설정해 주세요.' }, () => {
				  			setTimeout(() => this.setState({ message: '' }), 2000);
						  });
				  		return null;
					  }
					  this.setState({ isShare: !isShare })
				  }}
				>
					<span className={cx({ 'active': isShare })}>SNS 공유하기</span>
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
				{message &&
					<div className="AudioPlayer__message">
						{message}
					</div>
				}
				{audioInfo &&
					<div className="AudioPlayer__content">
						{audioInfo}
					</div>
				}
				{shareContent &&
					<div className="AudioPlayer__share-content">
						{shareContent}
					</div>
				}
				{isShare && isSectionLoop &&
					<AudioShare
						id={location.query.id}
						startTime={startTime}
						endTime={endTime}
						onFacebookShare={onShareFacebook}
					  onNaverShare={onShareNaver}
					/>
				}
			</div>
		)
	}
}

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer