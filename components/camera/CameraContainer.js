import { connect } from 'preact-redux';
import Camera from './Camera';
import { enableCamera, disableCamera } from '../../services/camera';
import { savePhoto } from '../../services/photos/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    enabled: state.camera.enabled,
    enabling: state.camera.enabling,
    resolution: state.camera.resolution,
    imageCapture: state.camera.imageCapture,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    enableCamera: (constraints) => dispatch(enableCamera(constraints)),
    disableCamera: (isNew, field, value) => dispatch(disableCamera()),
    savePhoto: (photo) => dispatch(savePhoto(photo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
