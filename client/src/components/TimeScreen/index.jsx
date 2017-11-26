import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TimeScreen.scss';

const propTypes = {
	className: PropTypes.string,
	second: PropTypes.number,
};

const defaultProps = {
	className: '',
	second: 0,
};

class TimeScreen extends React.Component {
	render() {
		const { className, second } = this.props;
		const number = parseInt(second);
		const minute = number / 60;
		const remainSecond = number % 60;
		const resultSecond = remainSecond >= 10 ? remainSecond : `0${remainSecond}`;

		if (isNaN(second)) {
			return null;
		}

		return (
			<span className={cx('TimeScreen', className)}>
				{parseInt(minute)}:{resultSecond}
			</span>
		)
	}
}

TimeScreen.propTypes = propTypes;
TimeScreen.defaultProps = defaultProps;

export default TimeScreen;