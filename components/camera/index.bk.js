import { h, Component } from 'preact';

const CONTRAINTS = {
  audio: false,
  video: {
    facingMode: {
      exact: "user"
    }
  }
};

export default class Camera extends Component {
  constructor() {
    super();
    console.log('ciao');
    this.devices = [];


    // document.querySelector('button')
    //   .addEventListener('click', () => {
    //     this.init();
    //   });

  }
  componentDidMount() {
    this.video = document.querySelector('video');
    this.canvas = document.querySelector('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.video.addEventListener('loadedmetadata', (e) => {
      console.log('LOADED');
      this.initCanvas();
      this.startRenderLoop();
      // Ready to go. Do some stuff.
    });


    window.loadWASM().then(module => {
      this.webdsp = module;
      // things to execute on page load only after module is loaded
    });
  }
  initCamera(constraints) {
    const c = Object.assign({}, CONTRAINTS, constraints);
    console.log('initializing');
    this.stopRendering();
    if(this.video) {
      this.video.pause();
    }

    if(this.localMediaStream) {
      this.localMediaStream.getTracks().forEach(track => track.stop());
      this.localMediaStream = null;
    }

    console.log(c);
    setTimeout(() => {
      navigator.mediaDevices.getUserMedia(c).then((localMediaStream) => {
          // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
          // See crbug.com/110938.
          this.localMediaStream = localMediaStream;
          this.video.srcObject = localMediaStream;
        }).catch(() => {});
    });

  }
  initCanvas() {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    this.canvas.style.display = 'none';
  }
  renderFrame() {
    this.canvasContext.
      drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    const pixels = this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    pixels.data.set(this.webdsp.invert(pixels.data));
    this.canvasContext.putImageData(pixels, 0, 0);
  }
  toFrontCamera() {
    const constraints = {
      video: {
        facingMode: {
          exact: "user"
        }
      }
    };
    this.initCamera(constraints);
  }
  toBackCamera() {
    const constraints = {
      video: {
        facingMode: {
          exact: "environment",
        }
      }
    };
    this.initCamera(constraints);
  }
  startRenderLoop() {
    const renderFrameLoop = () => {
      this.renderFrame();
      this.raf_ = requestAnimationFrame(renderFrameLoop);
    };
    renderFrameLoop();
  }
  stopRendering() {
    if(this.raf_) {
      cancelAnimationFrame(this.raf_);
      this.raf_ = null;
    }
  }
  render() {
    return (
      <div class='camera'>
        <h1> Camera </h1>
        <button onClick={this.toggleCamera.bind(this)}>Toggle camera</button>
        <button onClick={this.initCamera.bind(this)}>Start</button>
        <video autoplay></video>
      </div>
    );
  }
}
