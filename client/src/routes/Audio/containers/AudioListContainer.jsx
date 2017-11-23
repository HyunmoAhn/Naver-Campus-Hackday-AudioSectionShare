import { connect } from 'react-redux';
import AudioList from 'components/AudioList';
import { listSelector } from 'store/audio/selectors';
import {
	audioListFetch,
	audioInformationUsedList
} from 'store/audio/actions';

const mapStateToProps = state => ({
	list: listSelector(state),
});

const mapDispatchToProps = {
	onListFetch: audioListFetch,
	onListInfo: audioInformationUsedList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);