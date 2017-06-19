import { connect } from 'preact-redux';
import Library from './library';

const mapStateToProps = (state, ownProps) => {
  return {
    photos: state.photos.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
