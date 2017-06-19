import { h, Component } from 'preact';
import style from './style';
import Camera from '../../components/camera';
import { route } from 'preact-router';

export default class CameraRoute extends Component {
  componentDidMount () {
    if (!this.props.enabled && !this.props.enabling) {
      route('/');
    }
  }
  render () {
    return (
      <Camera />
    );
  }
}
