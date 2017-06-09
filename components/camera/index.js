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
    this.canvasContext = this.canvas.getContext('2d');
    this.video.addEventListener('loadedmetadata', (e) => {
      this.setCanvasSize();
      this.startRenderLoop();
    });

    window.loadWASM().then(module => {
      this.webdsp = module;
      // things to execute on page load only after module is loaded
    });
  }
  setCamera (constraints) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((localMediaStream) => {
        this.mediaStream = localMediaStream;
        this.video.srcObject = localMediaStream;
      }).catch(() => {});
  }
  setCanvasSize () {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
  }
  renderFrame () {
    this.canvasContext
      .drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    const pixels = this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    pixels.data.set(this.webdsp.invert(pixels.data));
    this.canvasContext.putImageData(pixels, 0, 0);
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
    this.video.pause();
    this.state.cameraMode = cameraMode;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    setTimeout(() => {
      this.setCamera(CONTRAINTS[cameraMode]);
    }, 0);
  }
  toggleCamera () {
    console.log(this.state.cameraMode);
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
  render () {
    const self = this;
    return (
      <div class={style.camera}>
        <canvas ref={(canvas) => { self.canvas = canvas }} />
        <video ref={(video) => { self.video = video }} autoPlay class='video' />
        <div class={style.cameraControls}>
          <button onClick={this.toggleCamera.bind(self)}>Toggle</button>
          <button onClick={() => self.setCamera(CONTRAINTS[self.state.cameraMode])}>Start</button>
        </div>
      </div>
    );
  }
}
