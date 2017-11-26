import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './AudioPlayerVolumeBox.scss';

const propTypes = {
	volume: PropTypes.number,
	onToggleMute: PropTypes.func,
	onVolumeChange: PropTypes.func,
};

const defaultProps = {
	volume: 0,
	onToggleMute() {},
	onVolumeChange() {},
};

class AudioPlayerVolumeBox extends React.Component {
	render() {
		const { volume, onToggleMute, onVolumeChange} = this.props;
		const volumeClassName = cx('fa', {
			'fa-volume-up': volume > 30,
			'fa-volume-down': volume <= 30 && volume > 0,
			'fa-volume-off': volume <= 0,
		});

		return (
			<div className="AudioPlayerVolumeBox col-xs-4">
				<button
					className="AudioPlayerVolumeBox__mute-btn"
					type="button"
					onClick={onToggleMute}
				>
					<i className={volumeClassName} />
				</button>
				<div
					className="AudioPlayerVolumeBox__volume-controller range__container"
				>
					<input
						className="range"
						type="range"
						value={volume}
						onChange={e => onVolumeChange(e.target.value)}
					/>
				</div>
				<span className="AudioPlayerVolumeBox__volume">{volume}</span>
			</div>
		);
	}
}

AudioPlayerVolumeBox.propTypes = propTypes;
AudioPlayerVolumeBox.defaultProps = defaultProps;

export default AudioPlayerVolumeBox;
