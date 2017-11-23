import { connect } from 'react-redux';
import AudioPlayer from 'components/AudioPlayer'
import {
	audioInformation,
	naverShareInformation,
	faceBookShareInformation,
} from 'store/audio/actions';
import * as selectors from 'store/audio/selectors';

const mapStateToProps = state => ({
	audioInfo: selectors.audioInfoSelector(state),
	shareContent: selectors.shareContentSelector(state),
	title: selectors.titleSelector(state),
	url: selectors.urlSelector(state),
});

const mapDispatchToProps = {
	onFetchAudioInfo: audioInformation,
	onShareNaver: naverShareInformation,
	onShareFacebook: faceBookShareInformation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);