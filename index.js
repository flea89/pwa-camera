import './style';

import { h } from 'preact';
import { Router } from 'preact-router';
import Home from './routes/home';
import Camera from './routes/camera';
import Library from './routes/library';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'preact-redux';
import { cameraReducer } from './services/camera/reducers';
import { photosReducer } from './services/photos/reducers';
import 'webrtc-adapter';

const middleware = [thunk];
let store = createStore(combineReducers({
  camera: cameraReducer,
  photos: photosReducer,
}), {}, compose(
  applyMiddleware(...middleware),
));

export default () => (
  <Provider store={store}>
    <div id='app'>
      <Router>
        <Home path='/' />
        <Library path='/library' />
        <Camera path='/camera' />
      </Router>
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
    </div>
  </Provider>
);
