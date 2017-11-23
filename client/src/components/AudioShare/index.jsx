import React from 'react';
import PropTypes from 'prop-types';
import './AudioShare.scss';

const propTypes = {
	shareContent: PropTypes.string,
	onFacebookShare: PropTypes.func,
	onNaverShare: PropTypes.func,
};

const defaultProps = {
	shareContent: '',
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
		if (this.props.shareContent) {
			return (
				<div className="AudioShare__content">
					{this.props.shareContent}
				</div>
			)
		}
		return (
			<div className="AudioShare">
				<textarea
					className="AudioShare__textarea"
					placeholder="공유 시 전달하고 싶은 문구를 적어주세요."
					cols="30"
					rows="10"
				/>
				<button
					className="AudioShare__btn AudioShare__btn-naver"
				  type="button"
				  onClick={this.props.onNaverShare}
				>
					Naver
				</button>
				<button
					className="AudioShare__btn AudioShare__btn-facebook"
				  type="button"
				  onClick={this.props.onFacebookShare}
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