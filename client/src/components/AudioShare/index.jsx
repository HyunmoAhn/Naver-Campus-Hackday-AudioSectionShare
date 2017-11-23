import React from 'react';
import PropTypes from 'prop-types';
import './AudioShare.scss';

const propTypes = {
	id: PropTypes.string.isRequired,
	startTime: PropTypes.number.isRequired,
	endTime: PropTypes.number.isRequired,
	onFacebookShare: PropTypes.func,
	onNaverShare: PropTypes.func,
};

const defaultProps = {
	onFacebookShare() {},
	onNaverShare() {},
};

class AudioShare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	render() {
		return (
			<div className="AudioShare">
				<textarea
					className="AudioShare__textarea"
					placeholder="공유 시 전달하고 싶은 문구를 적어주세요."
					cols="30"
					rows="10"
				  value={this.state.value}
				  onChange={(e) => this.setState({ value: e.target.value })}
				/>
				<button
					className="AudioShare__btn AudioShare__btn-naver"
				  type="button"
				  onClick={() => this.props.onNaverShare(
				  	this.props.id,
					  this.props.startTime,
					  this.props.endTime,
					  this.state.value,
				  )}
				>
					Naver
				</button>
				<button
					className="AudioShare__btn AudioShare__btn-facebook"
				  type="button"
				  onClick={() => this.props.onFacebookShare(
					  this.props.id,
					  this.props.startTime,
					  this.props.endTime,
					  this.state.value,
				  )}
				>
					Facebook
				</button>
			</div>
		);
	}
}

AudioShare.propTypes = propTypes;
AudioShare.defaultProps = defaultProps;

export default AudioShare;