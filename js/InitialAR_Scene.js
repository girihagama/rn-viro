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
  ViroScene,
} from 'react-viro';
import { connect } from 'react-redux/src';

import questions from './speech_and_buttons.json';

import { initializeStore } from '../store/actions/main_Actions';
import { initSteps, setStep } from '../store/actions/navigation_Actions';

import SceneOne_Portal from './SceneOne_Portal';
import SceneTwo_Portal from './SceneTwo_Portal';
import SceneThree_Portal from './SceneThree_Portal';
import SceneFour_Portal from './SceneFour_Portal';

import Begin from './res/Begin.png';
import Yes from './res/Yes.png';
import No from './res/No.png';
import Sure from './res/Sure.png';
import Exit from './res/Exit.png';

import v1 from './res/speech/v1.mp3';
import v2 from './res/speech/v2.mp3';
import v3 from './res/speech/v3.mp3';
import v4 from './res/speech/v4.mp3';
import v5 from './res/speech/v5.mp3';
import v6 from './res/speech/v6.mp3';
import v7 from './res/speech/v7.mp3';
import v8 from './res/speech/v8.mp3';
import v9 from './res/speech/v9.mp3';
import v10 from './res/speech/v10.mp3';
import v11 from './res/speech/v11.mp3';
import v12 from './res/speech/v12.mp3';

export class InitialAR_Scene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      counter: 0,
      questionsLoaded: false,
      questionBoxVisible: false,
      questionBoxButton: false,
      paused: true,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._onBeginTap = this._onBeginTap.bind(this);
    this._onYesTap = this._onYesTap.bind(this);
    this._onSureTap = this._onSureTap.bind(this);
    this._onNoTap = this._onNoTap.bind(this);
    this._onExitTap = this._onExitTap.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
  }

  render() {
    console.log({ "PROPS": this.props }, { "STATE": this.state });
    var steps = this.props.store.questions;
    var { active_step, active_step_data } = this.props.navigation_Reducer;
    var stepButtons = active_step_data.Buttons;

    console.log(stepButtons);

    //read buttons
    if (stepButtons) {
      var processedButtons = [];
      for (var key in stepButtons) {
        processedButtons.push(key); //[key, stepButtons[key]]
      }
      stepButtons = processedButtons;
    }
    Array.prototype.contains = function (element) {
      return this.indexOf(element) > -1;
    };

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>

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
          <ViroText text={active_step_data.Question || this.state.text}
            textAlign="center"
            width={2.5}
            textAlignVertical="center"
            textLineBreakMode="Justify"
            outerStroke={{ type: "DropShadow", width: 0.5, color: 'black' }}
            style={{ flex: 1, fontSize: 15, textAlign: 'center', fontWeight: 'bold' }} />

          {/* show buttons only if the steps are loaded */}
          {(steps) ?
            <ViroFlexView style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
              {(stepButtons.contains("Begin")) ?
                <ViroButton
                  source={Begin}
                  gazeSource={Begin}
                  tapSource={Begin}
                  height={0.4}
                  width={1}
                  onClick={this._onBeginTap.bind(this)} /> : <ViroText/>
              }
              {(stepButtons.contains("Yes")) ?
                <ViroButton
                  source={Yes}
                  gazeSource={Yes}
                  tapSource={Yes}
                  height={0.4}
                  width={1}
                  onClick={this._onYesTap("Yes")} /> : <ViroText/>
              }
              {(stepButtons.contains("Sure")) ?
                <ViroButton
                  source={Sure}
                  gazeSource={Sure}
                  tapSource={Sure}
                  height={0.4}
                  width={1}
                  onClick={this._onSureTap("Sure")} /> : <ViroText/>
              }
              {(stepButtons.contains("No")) ?
                <ViroButton
                  source={No}
                  gazeSource={No}
                  tapSource={No}
                  height={0.4}
                  width={1}
                  onClick={this._onNoTap("No")} /> : <ViroText/>
              }
              {(stepButtons.contains("Exit")) ?
                <ViroButton
                  source={Exit}
                  gazeSource={Exit}
                  tapSource={Exit}
                  height={0.4}
                  width={1}
                  onClick={this._onExitTap.bind(this)} /> : <ViroText/>
              }
            </ViroFlexView>
            : <ViroText text="" />
          }

          {/* <ViroFlexView style={{ flex: .5, flexDirection: 'row' }}></ViroFlexView> */}
        </ViroFlexView>

        {/* <ViroAmbientLight color="#000000" intensity={200}/> */}
        {(this.state.counter > 0) ?
          <SceneOne_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props} />
          // <SceneTwo_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props} />
          // <SceneThree_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props} />
          // <SceneFour_Portal sceneNavigator={this.props.sceneNavigator} passProps={this.props} />
          :
          <ViroSound paused={this.state.paused} source={require("./res/speech/v1.mp3")} /> // source={require("./res/speech/v1.mp3")}
        }
      </ViroARScene>
    );
  }

  _onButtonTap() {
    this.setState({
      counter: this.state.counter + 1,
    });

    console.log(this.active_step);
  }

  _onBeginTap = () => {
    console.log(this.props);
  }

  _onYesTap() {
    console.log(stepData);
  }

  _onSureTap(stepData) {
    console.log(stepData);
  }

  _onNoTap(stepData) {
    console.log(stepData);
  }

  _onExitTap() {
    console.log("Exit");
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("Tracking Available");
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
      console.log("Tracking Lost");
    }

    //load questions
    if (!this.state.questionsLoaded) {
      this.props.initializeStore(questions);
      this.setState({ questionsLoaded: true });
    }
  }

  //3D modal initialization
  _onLoadStart() {
    console.log("OBJ loading has started");
  }

  _onLoadEnd() {
    console.log("OBJ loading has finished");
    this.setState({ questionBoxButton: true, paused: false });

    this.setState({
      text: "Loading Questions...",
      //counter: 0,
      questionBoxVisible: true,
    });
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

const mdtp = (dispatch) => {
  return {
    initializeStore: (question) => dispatch(initializeStore(question)),
    initSteps: (stepData) => dispatch(initSteps(stepData)),
    setStep: (step_number) => dispatch(setStep(step_number)),
  }
}

module.exports = connect(mstp, mdtp)(InitialAR_Scene);