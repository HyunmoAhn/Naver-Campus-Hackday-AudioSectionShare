import { connect } from 'react-redux';
import AudioList from 'components/AudioList';
import { listSelector } from 'store/audio/selectors';
import {
	audioListFetch,
	audioInformationUsedList,
	audioSetFalseSectionLoop,
} from 'store/audio/actions';

const mapStateToProps = state => ({
	list: listSelector(state),
});

const mapDispatchToProps = {
	onListFetch: audioListFetch,
	onListInfo: audioInformationUsedList,
	onSetFalseSectionLoop: audioSetFalseSectionLoop,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);