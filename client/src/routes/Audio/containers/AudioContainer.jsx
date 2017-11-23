import { connect } from 'react-redux';
import AudioPlayer from 'components/AudioPlayer'
import { audioInformation } from 'store/audio/actions';

const mapDispatchToProps = {
	onFetchAudioInfo: audioInformation,
};

export default connect(null, mapDispatchToProps)(AudioPlayer);