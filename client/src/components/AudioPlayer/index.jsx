import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AudioPlayerTimeBox from '../AudioPlayerTimeBox';
import AudioPlayerVolumeBox from '../AudioPlayerVolumeBox';
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
			volume: 50,
		};
		this.audio = new Audio(props.src);
		this.audio.autoplay = true;
		this.audio.onpause = () => {
			if (this.audio.currentTime === this.audio.duration) {
				this.audio.currentTime = 0;
			}
		};
		this.audio.ontimeupdate = () => {
			this.setState({
				currentTime: this.audio.currentTime,
			});
		};

		this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
		this.handleToggleMute = this.handleToggleMute.bind(this);
		this.handleTogglePlay = this.handleTogglePlay.bind(this);
		this.handleToggleLoop = this.handleToggleLoop.bind(this);
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

		if (!this.audio) {
			return <div>
				지원하지 않는 브라우저입니다.
			</div>;
		}

		return (
			<div className="AudioPlayer">
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
			</div>
		)
	}
}

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer