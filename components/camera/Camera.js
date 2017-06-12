import { h, Component } from 'preact';
import style from './style.scss';
import debounce from 'lodash/debounce';

const CAMERA_MODE = {
  FRONT: 1,
  BACK: 2,
}

const CONTRAINTS = {
  [CAMERA_MODE.FRONT]: {
    audio: false,
    video: {
      facingMode: {
        exact: 'user',
      }
    }
  },
  [CAMERA_MODE.BACK]: {
    audio: false,
    video: {
      facingMode: {
        exact: 'environment',
      }
    }
  },
};

export default class Camera extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cameraMode: CAMERA_MODE.FRONT
    };
  }
  componentDidMount () {
    console.log('componentDidMount');
    this.canvasContext = this.canvas.getContext('2d');
    window.addEventListener('resize', debounce(() => {
      if (this.props.resolution) {
        this.setCanvasSize(this.props.resolution);
      }
    }, 100));

    if (this.props.enabled) {
      this.startRenderLoop();
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.enabled && !nextProps.enabled) {
      this.stopRendering();
    }

    if (!this.props.enabled && nextProps.enabled) {
      this.setCanvasSize(nextProps.resolution);
      window.setTimeout(() => this.startRenderLoop());
    }
  }
  setCanvasSize (frameResolution) {
    let scale;
    const frameRatio = frameResolution.width / frameResolution.height;
    const viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    if (frameRatio > 1) {
      scale = viewportSize.width / frameResolution.width;
    } else {
      scale = viewportSize.height / frameResolution.height;
    }
    this.canvas.width = frameResolution.width;
    this.canvas.height = frameResolution.height;
    this.canvas.style.transform = `scale(${scale})`
    this.canvas.style.left = `${(viewportSize.width - this.canvas.width * scale) / 2}px`;
    this.canvas.style.top = `${(viewportSize.height - this.canvas.height * scale) / 2}px`;
  }
  setCamera (constraints) {
    console.log('setting camera')
    this.props.enableCamera(constraints);
  }
  async renderFrame () {
    try {
      const frame = await this.props.imageCapture.grabFrame();
      this.canvasContext.drawImage(frame, 0, 0);
      return frame;
    } catch (e) {
      console.log(e);
      if (e && e.code === 11) {
        this.switchCamera(this.state.cameraMode);
      }
    }
  }
  startRenderLoop () {
    const renderFrameLoop = () => {
      this.renderFrame();
      this.raf_ = window.requestAnimationFrame(renderFrameLoop);
    };
    renderFrameLoop();
  }
  switchCamera (cameraMode) {
    this.stopRendering();
    this.state.cameraMode = cameraMode;
    this.props.disableCamera();
    setTimeout(() => {
      this.props.enableCamera(CONTRAINTS[cameraMode]);
    }, 0);
  }
  toggleCamera () {
    if (this.state.cameraMode === CAMERA_MODE.FRONT) {
      this.switchCamera(CAMERA_MODE.BACK);
    } else {
      this.switchCamera(CAMERA_MODE.FRONT);
    }
  }
  stopRendering () {
    if (this.raf_) {
      window.cancelAnimationFrame(this.raf_);
      this.raf_ = null;
    }
  }
  async takePhoto () {
    const blob = await this.props.imageCapture.takePhoto();
  }
  render () {
    const self = this;
    return (
      <div class={style.camera}>
        <canvas ref={(canvas) => { self.canvas = canvas }} />
        <div class={style.controlsTop}>
          <a class={style.toggleCamera} onClick={() => self.toggleCamera()}>
            <i class='material-icons'>switch_camera</i>
          </a>
        </div>
        <a class={style.startCamera} onClick={() => self.setCamera(CONTRAINTS[self.state.cameraMode])}>Start</a>
        <div class={style.controlsBottom}>
          <a class={style.shoot} onClick={() => self.takePhoto()}>Take Picture</a>
        </div>
      </div>
    );
  }
}

//enabled
//Props
