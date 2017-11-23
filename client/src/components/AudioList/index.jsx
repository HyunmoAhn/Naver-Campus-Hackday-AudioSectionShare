import React from 'react';
import PropTypes from 'prop-types';
import AudioListItem from '../AudioListItem';
import './AudioList.scss';

const propTypes = {
	list: PropTypes.array,
	router: PropTypes.object,
	onListFetch: PropTypes.func,
	onListInfo: PropTypes.func,
};

const defaultProps = {
	list: [],
	router: {},
	onListFetch() {},
	onListInfo() {},
};

class AudioList extends React.Component {
	componentDidMount() {
		this.props.onListFetch();
	}
	render() {
		return (
			<div className="AudioList">
				{this.props.list.map((item, index) =>
					<AudioListItem
						key={index}
						router={this.props.router}
					  item={item}
						onListInfo={this.props.onListInfo}
					/>)
				}
			</div>
		);
	}
}

AudioList.propTypes = propTypes;
AudioList.defaultProps = defaultProps;

export default AudioList;