import { connect } from 'preact-redux';
import CameraRoute from './CameraRoute';

const mapStateToProps = (state, ownProps) => {
  return {
    enabled: state.camera.enabled,
    enabling: state.camera.enabling
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraRoute);
