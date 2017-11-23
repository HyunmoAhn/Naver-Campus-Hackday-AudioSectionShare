import React from 'react';
import PropTypes from 'prop-types';
import TimeScreen from '../TimeScreen';
import './AudioPlayerTimeBox.scss';

const propTypes = {
	currentTime: PropTypes.number,
	duration: PropTypes.number,
	onCurrentTimeChange: PropTypes.func,
};

const defaultProps = {
	currentTime: 0,
	duration: 0,
	onCurrentTimeChange() {},
};

class AudioPlayerTimeBox extends React.Component {
	render() {
		const { currentTime, duration, onCurrentTimeChange } = this.props;
		const relativeCurrentTime = currentTime / duration * 100;

		return (
			<div className="AudioPlayerTimeBox">
				<TimeScreen className="AudioPlayerTimeBox__currentTime" second={currentTime} />
				<div
					className="AudioPlayerTimeBox__range"
				>
					<input
						type="range"
						value={relativeCurrentTime}
						onChange={onCurrentTimeChange}
					/>
				</div>
				<TimeScreen className="AudioPlayerTimeBox__duration" second={duration} />
			</div>
		);
	}
}

AudioPlayerTimeBox.propTypes = propTypes;
AudioPlayerTimeBox.defaultProps = defaultProps;

export default AudioPlayerTimeBox;