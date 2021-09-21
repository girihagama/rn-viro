'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroARCamera,
  ViroScene,
  ViroBox,
  ViroText,
  ViroConstants,
  ViroVideo,
  Viro3DObject,
  ViroAmbientLight,
  ViroPortalScene,
  ViroPortal,
  ViroImage,
  ViroFlexView,
  Viro360Video,
  ViroButton,
  ViroSound,
  ViroNode,
  ViroARPlaneSelector
} from 'react-viro';

import { connect } from 'react-redux';
import Scene_Parachute from './Scene_Parachute';
export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      counter: 0,
      questionBoxVisible: false,
      questionBoxButton: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    console.log(this.props);

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}

        {/* AR text component */}
        {/* <ViroText
          text={this.state.text}
          textAlign="center"
          textAlignVertical="center"
          textLineBreakMode="Justify"
          textClipMode="ClipToBounds"
          width={2} height={2}
          style={{ fontFamily: "Arial", fontSize: 30, fontWeight: 'bold', color: "#0000FF" }}
          position={[0, 0, -2]}
          scale={[.5, .5, .5]}
          outerStroke={{ type: "Outline", width: 2, color: '#000000' }}
        /> */}

        {/* AR video component */}
        {/* <ViroVideo
          source={require('./res/intro.mp4')}
          loop={true}
          width={3}
          height={2}
          position={[0, -1, -2]}
          scale={[.5, .5, .5]}
        /> */}

        {/* light source and 3D object */}
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          width={2} height={2}
          source={require('./res/3d_modals/cat/12221_Cat_v1_l3.obj')}
          type="OBJ"
          lightReceivingBitMask={3}
          shadowCastingBitMask={2}
          position={[-15, -45, -70]}
          scale={[0.75, 0.75, 0.75]}
          scalePivot={[0, 0, 0]}
          rotation={[90, 150, 180]}
          rotationPivot={[0, 0, 0]}
          onLoadStart={this._onLoadStart}
          onLoadEnd={this._onLoadEnd.bind(this)}
          onError={this._onError}
          resources={[
            require('./res/3d_modals/cat/12221_Cat_v1_l3.mtl'),
            require('./res/3d_modals/cat/Cat_bump.jpg'),
            require('./res/3d_modals/cat/Cat_diffuse.jpg'),
          ]} />

        {/* question boxes */}
        <ViroFlexView visible={this.state.questionBoxButton} style={{ flexDirection: 'column', alignItems: 'center', padding: .1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          width={3} height={2}
          position={[0, 0, -5]}
          rotation={[0, 0, 0]} >
          <ViroText text={this.state.text}
            textAlign="center"
            width={2.5}
            textAlignVertical="center"
            textLineBreakMode="Justify"
            outerStroke={{ type: "DropShadow", width: 0.5, color: 'black' }}
            style={{ flex: 1, fontSize: 15 }} />
          <ViroFlexView style={{ flex: 1, flexDirection: 'row', }}>
            <ViroButton
              source={require("./res/button.png")}
              gazeSource={require("./res/button.png")}
              tapSource={require("./res/button.png")}
              height={0.8}
              width={1.4}
              position={[0, -5, 0]}
              onClick={this._onButtonTap.bind(this)} />
          </ViroFlexView>
          {/* <ViroFlexView style={{ flex: .5, flexDirection: 'row' }}></ViroFlexView> */}
        </ViroFlexView>

        {/* <ViroAmbientLight color="#000000" intensity={200}/> */}
        {(this.state.counter > 0) ?
          <Scene_Parachute />
          :
          <ViroSound source={require("./res/questions/q1.mp3")} />
        }

      </ViroARScene>
    );
  }

  _onButtonTap() {
    this.setState({
      text: "Your answer was awsome!",
      counter: this.state.counter + 1,
    });
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hi, Welcome to AR zone. How are you feeling today?",
        counter: 0,
        questionBoxVisible: true
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  //3D modal initialization
  _onLoadStart() {
    console.log("OBJ loading has started");
  }
  _onLoadEnd() {
    console.log("OBJ loading has finished");
    this.setState({ questionBoxButton: true });
  }
  _onError(event) {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


const mstp = (state) => {
  return state;
}

module.exports = connect(mstp)(HelloWorldSceneAR);