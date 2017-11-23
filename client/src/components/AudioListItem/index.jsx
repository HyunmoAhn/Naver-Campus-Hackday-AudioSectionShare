import React from 'react';
import PropTypes from 'prop-types';
import './AudioListItem.scss';

const propTypes = {
	item: PropTypes.object.isRequired,
	router: PropTypes.object,
	onListInfo: PropTypes.func,
};

class AudioListItem extends React.Component {
	render() {
		const { count, id, title } = this.props.item;
		return (
			<div
				className="AudioListItem"
			  onClick={() => {
					this.props.onListInfo(id);
				  this.props.router.push(`?id=${id}&isList=true`);
			  }}
			>
				<span className="AudioListItem__title">
					{title}
				</span>
				<span className="AudioListItem__count">
					{count}
				</span>
			</div>
		)
	}
}

AudioListItem.propTypes = propTypes;

export default AudioListItem;