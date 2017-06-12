import { h, Component } from 'preact';
import style from './style.scss';

export default class Home extends Component {
  enableCamera () {
    this.props.enableCamera();
  }

  render () {
    return (
      <div class={style.home}>
        <a onClick={() => this.enableCamera()} class={style.cameraBtn} href='/camera'>
          <i class='material-icons'>camera</i>
          <div> Start shooting</div>
        </a>
        <a class={style.galleryBtn}>
          <i class='material-icons'>photo_library</i>
          <div> Gallery</div>
        </a>
      </div>
    );
  }
}
