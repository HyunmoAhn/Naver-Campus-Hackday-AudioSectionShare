import React from 'react';
import PropTypes from 'prop-types';
import AudioListItem from '../AudioListItem';
import './AudioList.scss';

const propTypes = {
	list: PropTypes.array,
	router: PropTypes.object,
	onListFetch: PropTypes.func,
	onListInfo: PropTypes.func,
	onSetFalseSectionLoop: PropTypes.func,
};

const defaultProps = {
	list: [],
	router: {},
	onListFetch() {},
	onListInfo() {},
	onSetFalseSectionLoop() {},
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
						onListInfo={(id) => {
							this.props.onSetFalseSectionLoop();
							this.props.onListInfo(id);
						}}
					/>)
				}
			</div>
		);
	}
}

AudioList.propTypes = propTypes;
AudioList.defaultProps = defaultProps;

export default AudioList;