import { h, Component } from 'preact';
import style from './style';
console.log(style);

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
  }
  setCamera (constraints) {
    console.log('setting camera')
    navigator.mediaDevices.getUserMedia({video: true})
      .then((localMediaStream) => {
        this.track = localMediaStream.getVideoTracks()[0];
        window.t = this.track;
        this.imageCapture = new ImageCapture(this.track);
        this.imageCapture.grabFrame().then((imageBitmap) => {
          this.canvas.width = imageBitmap.width;
          this.canvas.height = imageBitmap.height;
          this.startRenderLoop();
        });
      }).catch(() => {});
  }
  async renderFrame () {
    try {
      const frame = await this.imageCapture.grabFrame();
      this.canvasContext.drawImage(frame, 0, 0);
      return frame;
    } catch (e) {
      if (e) {
        this.switchCamera(this.state.cameraMode);
        return Promise.reject();
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

    if (this.track) {
      this.track.stop();
      this.track = null;
    }

    setTimeout(() => {
      this.setCamera(CONTRAINTS[cameraMode]);
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
  async takePhoto() {
    const blob = await this.imageCapture.takePhoto();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    img.onload = () => { URL.revokeObjectURL(this.src); }
    document.body.append(img);
  }
  render () {
    const self = this;
    return (
      <div class={style.camera}>
        <canvas ref={(canvas) => { self.canvas = canvas }} />
        <div class={style.cameraControls}>
          <button onClick={this.toggleCamera.bind(self)}>Toggle</button>
          <button onClick={() => self.setCamera(CONTRAINTS[self.state.cameraMode])}>Start</button>
          <button onClick={() => self.takePhoto()}>Take Picture</button>
        </div>
      </div>
    );
  }
}
