import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TimeScreen from '../TimeScreen';
import './AudioButtonSet.scss';

const propTypes = {
	audio: PropTypes.object,
	endTime: PropTypes.number,
	isSectionLoop: PropTypes.bool,
	isSetSection: PropTypes.bool,
	isShare: PropTypes.bool,
	startTime: PropTypes.number,
	onSectionLoopCancel: PropTypes.func,
	onSetSection: PropTypes.func,
	onShareSetting: PropTypes.func,
	onToggleLoop: PropTypes.func,
	onTogglePlay: PropTypes.func,
};

const defaultProps = {
	audio: {},
	endTime: 0,
	isSectionLoop: false,
	isSetSection: false,
	isShare: false,
	startTime: 0,
	onSectionLoopCancel() {},
	onSetSection() {},
	onShareSetting() {},
	onToggleLoop() {},
	onTogglePlay() {},
};

class AudioButtonSet extends React.Component {
	render() {
		const { endTime, isSectionLoop, isSetSection, isShare, startTime } = this.props;
		const playBtnClassName = cx('fa', {
			'fa-play': this.props.audio.paused,
			'fa-pause': !this.props.audio.paused,
		});
		const loopBtnClassName = cx('fa', 'fa-retweet', {
			'active': this.props.audio.loop,
		});
		const sectionBtnClassName = cx('fa', 'fa-exchange', {
			'active': isSetSection,
		});

		return (
			<div className="AudioButtonSet">
				{isSectionLoop &&
				<button
					className="AudioButtonSet__section-loop-cancel"
					type="button"
					onClick={this.props.onSectionLoopCancel}
				>
					<TimeScreen second={startTime} />
					~
					<TimeScreen second={endTime} />
					<br />
					반복 해제
				</button>
				}
				<button
					className="AudioButtonSet__section-btn"
					disabled={isSectionLoop}
					type="button"
					onClick={this.props.onSetSection}
				>
					<i className={sectionBtnClassName} />
				</button>
				<button
					className="AudioButtonSet__play-btn"
					type="button"
					onClick={this.props.onTogglePlay}
				>
					<i className={playBtnClassName} />
				</button>
				<button
					className="AudioButtonSet__toggle-btn"
					type="button"
					onClick={this.props.onToggleLoop}
				>
					<i className={loopBtnClassName} />
				</button>
				<button
					className="AudioButtonSet__share-btn"
					type="button"
					onClick={this.props.onShareSetting}
				>
					<span className={cx({ 'active': isShare })}>SNS 공유하기</span>
				</button>
			</div>
		);
	}
}

AudioButtonSet.propTypes = propTypes;
AudioButtonSet.defaultProps = defaultProps;

export default AudioButtonSet;