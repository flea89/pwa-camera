import {
  enableCamera as enableCameraAction,
  disableCamera as disableCameraAction,
  requestEnableCamera,
} from './actions';

export const enableCamera = (constraints) => {
  return async(dispatch) => {
    dispatch(requestEnableCamera());
    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
    const track = mediaStream.getTracks()[0];
    const imageCapture = new ImageCapture(track);
    const imageBitmap = await imageCapture.grabFrame();
    const resolution = {
      width: imageBitmap.width,
      height: imageBitmap.height,
    };
    // const resolution = {
    //   width: 500,
    //   height: 200,
    // }
    dispatch(enableCameraAction({
      imageCapture,
      track,
      resolution,
    }));
  }
}

export const disableCamera = () => {
  return (dispatch, getState) => {
    const track = getState().camera.track;

    track.stop();
    dispatch(disableCameraAction());
  }
}
