export const ENABLE_CAMERA_ACTION = 'ENABLE_CAMERA';
export const REQUEST_ENABLE_CAMERA_ACTION = 'REQUEST_ENABLE_CAMERA';
export const DISABLE_CAMERA = 'DISABLE_CAMERA';

export const enableCamera = (info) => ({
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
