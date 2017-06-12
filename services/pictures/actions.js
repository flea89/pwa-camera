export const SAVE_PICTURE_ACTION = 'SAVE_PICTURE';
export const DELETE_PICTURE = 'DELETE_PICTURE';

export const savePicture = (info) => ({
  type: ENABLE_CAMERA_ACTION,
  payload: {
    info,
  }
})

export const requestEnableCamera = (constraints) => ({
  type: REQUEST_ENABLE_CAMERA_ACTION,
  payload: {
    constraints
  }
})

export const disableCamera = () => ({
  type: DISABLE_CAMERA,
})
