import { connect } from 'preact-redux';
import Camera from './Camera';
import { enableCamera, disableCamera } from '../../services/camera';

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    enabled: state.camera.enabled,
    resolution: state.camera.resolution,
    imageCapture: state.camera.imageCapture,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    enableCamera: (constraints) => dispatch(enableCamera(constraints)),
    disableCamera: (isNew, field, value) => dispatch(disableCamera()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
