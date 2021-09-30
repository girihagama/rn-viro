'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroFlexView,
  ViroButton,
  ViroSound,
} from 'react-viro';

import { connect } from 'react-redux';
import { Provider } from 'react-redux/src';
import store from '../store';

import SceneOne_Portal from './SceneOne_Portal';
import SceneTwo_Portal from './SceneTwo_Portal';
import SceneThree_Portal from './SceneThree_Portal';
import SceneFour_Portal from './SceneFour_Portal';

export default class InitialAR_Scene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      counter: 0,
      questionBoxVisible: false,
      questionBoxButton: false,
      paused: true,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    console.log(this.props);

    return (
      <Provider store={store}>
        <ViroARScene onTrackingUpdated={this._onInitialized} >

          {/* light source and 3D object */}
          <ViroAmbientLight color="#ffffff" />
          <Viro3DObject
            onDrag={() => { }}
            dragType="FixedToPlane"
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
            // <SceneOne_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props, this.props.store} />
            // <SceneTwo_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props, this.props.store} />
            // <SceneThree_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props, this.props.store} />
            <SceneFour_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props, this.props.store} />
            :
            <ViroSound paused={this.state.paused} source={require("./res/questions/q1.mp3")} />
          }
        </ViroARScene>
      </Provider>
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
      console.log("Tracking Available");

      this.setState({
        text: "Hi, Welcome to AR zone. How are you feeling today?",
        counter: 0,
        questionBoxVisible: true,
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
      console.log("Tracking Lost");
    }
  }

  //3D modal initialization
  _onLoadStart() {
    console.log("OBJ loading has started");
  }
  _onLoadEnd() {
    console.log("OBJ loading has finished");
    this.setState({ questionBoxButton: true, paused: false });
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

module.exports = InitialAR_Scene;