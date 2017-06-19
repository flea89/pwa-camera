import {
  SAVE_PICTURE_ACTION,
} from './actions';

const initialPhotosState = {
  list: [],
};

export const photosReducer = (state = initialPhotosState, action) => {
  switch (action.type) {
    case SAVE_PICTURE_ACTION:
      return {list: [...state.list, ...action.payload.photo]};
    default:
      return state;
  }
};
