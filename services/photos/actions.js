export const SAVE_PICTURE_ACTION = 'SAVE_PICTURE';
export const DELETE_PICTURE = 'DELETE_PICTURE';

export const savePhoto = (photo) => ({
  type: SAVE_PICTURE_ACTION,
  payload: {
    photo,
  }
});
