import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

import store from './store/index.js'; //importing redux store config from store/index.js
import { Provider } from 'react-redux/src'; //importing binding layer from reac-redux

//AppRegistry.registerComponent('APP_NAME_HERE', () => App);
//AppRegistry.registerComponent('ViroSample', () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);