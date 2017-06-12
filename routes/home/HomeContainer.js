import { connect } from 'preact-redux';
import { enableCamera, disableCamera } from '../../services/camera';
import Home  from './Home';

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    cameraEnabled: state.camera.enabled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enableCamera: (constraints) => dispatch(enableCamera({video: true})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
