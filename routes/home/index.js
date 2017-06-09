import { h, Component } from 'preact';
import style from './style';
import Camera from '../../components/camera';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Camera/>
			</div>
		);
	}
}
