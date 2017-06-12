import {
  ENABLE_CAMERA_ACTION,
  REQUEST_ENABLE_CAMERA_ACTION,
  DISABLE_CAMERA,
} from './actions';

const initialCameraState = {
  enabled: false,
  enabling: false
};

export const cameraReducer = (state = initialCameraState, action) => {
  switch (action.type) {
    case REQUEST_ENABLE_CAMERA_ACTION:
      return {...state, enabling: true};
    case ENABLE_CAMERA_ACTION:
      console.log(action);
      return {...state, enabled: true, enabling: false, ...action.payload.info};
    case DISABLE_CAMERA:
      return {...state, enabled: false};
    default:
      return state;
  }
};
