import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux/src'; //importing binding layer from reac-redux
import { createStore } from 'redux';

import App from './App';
var reducers = require('./store/reducers/index');

let store = createStore(reducers);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('ViroSample', () => Root);