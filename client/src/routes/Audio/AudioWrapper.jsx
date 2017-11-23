import React from 'react';
import PropTypes from 'prop-types';
import AudioContainer from './containers/AudioContainer'
import AudioListContainer from './containers/AudioListContainer';

const propTypes = {
	router: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

class AudioWrapper extends React.Component {
	render() {
		const { router, location } = this.props;

		return (
			<div>
				<AudioContainer router={router} location={location} />
				<AudioListContainer router={router} location={location} />
			</div>
		);
	}
}

AudioWrapper.propTypes = propTypes;

export default AudioWrapper;