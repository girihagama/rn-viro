'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import {
  ViroPortalScene,
  ViroPortal,
  Viro360Video,
  Viro3DObject,
  ViroText,
  ViroSound
} from 'react-viro';

export default class Scene_Parachute extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  state = {
    play: false,
  }

  render() {
    return (
      <ViroPortalScene passable={true} >
        {/* <ViroText
          text="Touch to enlarge"
          textAlign="center"
          textAlignVertical="center"
          textLineBreakMode="Justify"
          width={2} height={2}
          style={{ fontFamily: "Arial", fontSize: 30, fontWeight: 'bold', color: "#0000FF" }}
          position={[0, 0, 0]}
          scale={[.5, .5, .5]}
          outerStroke={{ type: "Outline", width: 2, color: '#000000' }}
        /> */}
        <ViroPortal position={[0, 2, 5]} scale={[.1, .1, .1]}>
          <Viro3DObject source={require('./portals/portal_res/3d-model.obj')}
            resources={[
              require('./portals/portal_res/3d-model.mtl'),
            ]}
            position={[30, -50, -70]}
            scale={[0.75, 0.75, 0.75]}
            rotation={[0,-50,0]}
            type="OBJ" />
        </ViroPortal>
        {
          (this.state.play) ?
            <Viro360Video source={require("./portals/portal_res/stonehenge.mp4")} loop={false} />
            :
            <ViroSound
              source={require("./res/music/PortalAppear.wav")} onFinish={() => { this.setState({ play: true }) }}
            />
        }

      </ViroPortalScene>
    );
  }
}

const mstp = (state) => {
  return state;
}

//module.exports = Scene_Parachute;
module.exports = connect(mstp)(Scene_Parachute);
