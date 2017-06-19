import { h, Component } from 'preact';
import style from './style';

export default class CameraRoute extends Component {
  render () {
    return (
      <div>
        {
          this.props.photos.map(blob => {
            const url = URL.createObjectURL(blob);
            return (
              <img class={style.thumbnail} src={url} />
            );
          })
        }
      </div>
    );
  }
}
