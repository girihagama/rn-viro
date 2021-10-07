'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux/src';

import { StyleSheet } from 'react-native';

import {
  ViroScene,
  Viro360Image,
  ViroText,
  ViroVideo
} from 'react-viro';

export default class InitialVR_Scene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    console.log(this.props);

    return (
      <ViroScene>
        <Viro360Image source={require('./res/modern_buildings.jpg')} />
        <ViroText text="Chatura Dharmaratne" width={2} height={2} position={[0, 1, -2]} style={styles.name} />
        <ViroText text="SLIIT 2018 FEB" width={2} height={2} position={[0, -2, -2]} style={styles.batch} />
        <ViroVideo
          source={require('./res/intro.mp4')}
          loop={true}
          width={3}
          height={2}
          position={[0, -0.5, -2]}
          scale={[1, 1, 1]}
        />    
      </ViroScene>
    );
  }

}

var styles = StyleSheet.create({
  name: {
    fontFamily: 'Calibri',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  batch: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

const mstp = (state) => {
  return state;
}

module.exports = connect(mstp)(InitialVR_Scene);
//module.exports = InitialVR_Scene;