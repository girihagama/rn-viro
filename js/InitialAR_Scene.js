'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  Button,
} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroFlexView,
  ViroButton,
  ViroSound,
  ViroAnimatedImage,
} from 'react-viro';
import { connect } from 'react-redux/src';
import RenderIf from 'render-if';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

import questions from './speech_and_buttons.json';

import { initializeStore } from '../store/actions/main_Actions';
import { setStep } from '../store/actions/navigation_Actions';

import SceneOne_Portal from './SceneOne_Portal';
import SceneTwo_Portal from './SceneTwo_Portal';
import SceneThree_Portal from './SceneThree_Portal';
import SceneFour_Portal from './SceneFour_Portal';

import Begin from './res/Begin.png';
import Yes from './res/Yes.png';
import No from './res/No.png';
import Sure from './res/Sure.png';
import Exit from './res/Exit.png';

import V1 from './res/speech/v1.mp3';
import V2 from './res/speech/v2.mp3';
import V3 from './res/speech/v3.mp3';
import V4 from './res/speech/v4.mp3';
import V5 from './res/speech/v5.mp3';
import V6 from './res/speech/v6.mp3';
import V7 from './res/speech/v7.mp3';
import V8 from './res/speech/v8.mp3';
import V9 from './res/speech/v9.mp3';
import V10 from './res/speech/v10.mp3';
import V11 from './res/speech/v11.mp3';
import V12 from './res/speech/v12.mp3';
import V13 from './res/speech/v13.mp3';

export class InitialAR_Scene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      initialized: false,
      buttonPosition: [0, 0, 0],
      paused: true,
      questionsLoaded: false,
      questionBoxVisible: false,
      questionBoxButton: false,
      delaying: false,
      //Voice
      recognized: "",
      pitch: "",
      error: "",
      end: "",
      started: "",
      results: [],
      partialResults: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._resetScenes = this._resetScenes.bind(this);
    this._onBeginTap = this._onBeginTap.bind(this);
    this._onYesTap = this._onYesTap.bind(this);
    this._onSureTap = this._onSureTap.bind(this);
    this._onNoTap = this._onNoTap.bind(this);
    this._onExitTap = this._onExitTap.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
    this._setARNodeRef = this._setARNodeRef.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  render() {
    console.log({ "PROPS": this.props }, { "STATE": this.state });
    var steps = this.props.store.questions;
    var { active_step, active_step_data } = this.props.navigation_Reducer;
    var stepButtons = (active_step_data.Buttons) ? active_step_data.Buttons : null;
    var stepSpeech = (active_step_data.Speech) ? active_step_data.Speech : null;

    //read buttons
    if (stepButtons) {
      var processedButtons = [];
      for (var key in stepButtons) {
        processedButtons.push(key); //[key, stepButtons[key]]
      }
      stepButtons = processedButtons;
    }

    if (stepSpeech) {
      var processedSpeech = [];
      processedSpeech.push(stepSpeech);
      stepSpeech = processedSpeech;
    }

    Array.prototype.contains = function (element) {
      return this.indexOf(element) > -1;
    };

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>

        {/* light source as a lighting meterial */}
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
          renderingOrder={-1}
          onLoadStart={this._onLoadStart}
          onLoadEnd={this._onLoadEnd.bind(this)}
          onError={this._onError}
          resources={[
            require('./res/3d_modals/cat/12221_Cat_v1_l3.mtl'),
            require('./res/3d_modals/cat/Cat_bump.jpg'),
            require('./res/3d_modals/cat/Cat_diffuse.jpg'),
          ]} />

        {/* question box */}
        <ViroFlexView renderingOrder={0} visible={this.state.questionBoxButton} style={{ flexDirection: 'column', alignItems: 'center', padding: .1, backgroundColor: 'rgba(0,0,0,0.5)' }}
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
          {RenderIf(steps || 1==1)(
            <ViroFlexView ref={this._setARNodeRef} renderingOrder={1} position={[0, 0, -5]} rotation={[0, 0, 0]} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
              {RenderIf(stepButtons && stepButtons.contains("Begin"))(
                <ViroButton
                  source={Begin}
                  gazeSource={Begin}
                  tapSource={Begin}
                  height={0.4}
                  width={1}
                  onClick={this._onBeginTap.bind(this)} />)
              }
              {RenderIf(stepButtons && stepButtons.contains("Yes"))(
                <ViroButton
                  source={Yes}
                  gazeSource={Yes}
                  tapSource={Yes}
                  height={0.4}
                  width={1}
                  onClick={this._onYesTap.bind(this)} />)
              }
              {RenderIf(stepButtons && stepButtons.contains("No"))(
                <ViroButton
                  source={No}
                  gazeSource={No}
                  tapSource={No}
                  height={0.4}
                  width={1}
                  onClick={this._onNoTap.bind(this)} />)
              }
              {RenderIf(stepButtons && stepButtons.contains("Sure"))(
                <ViroButton
                  source={Sure}
                  gazeSource={Sure}
                  tapSource={Sure}
                  height={0.4}
                  width={1}
                  onClick={this._onSureTap.bind(this)} />)
              }
              {RenderIf(stepButtons && stepButtons.contains("Exit"))(
                <ViroButton
                  source={Exit}
                  gazeSource={Exit}
                  tapSource={Exit}
                  height={0.4}
                  width={1}
                  onClick={this._onExitTap.bind(this)} />)
              }
              {RenderIf(!stepButtons && (active_step == 2 || active_step == 4 || active_step == 6 || active_step == 8))(
                <ViroAnimatedImage
                  height={0.8}
                  width={1.5}
                  placeholderSource={require("./res/enlarge.gif")}
                  source={require('./res/Loading.gif')}
                />
              )
              }

            </ViroFlexView>)
          }
        </ViroFlexView>

        {/*Aappear Portals */}
        {RenderIf(active_step == 2 || active_step == 10)(
          <SceneOne_Portal resetScenes={this._resetScenes} exitApp={this.props.exitApp} sceneNavigator={this.props.sceneNavigator} passProps={this.props} />)
        }
        {RenderIf(active_step == 4 || active_step == 10)(
          <SceneTwo_Portal resetScenes={this._resetScenes} exitApp={this.props.exitApp} sceneNavigator={this.props.sceneNavigator} passProps={this.props} />)
        }
        {RenderIf(active_step == 6 || active_step == 10)(
          <SceneThree_Portal resetScenes={this._resetScenes} exitApp={this.props.exitApp} sceneNavigator={this.props.sceneNavigator} passProps={this.props} />)
        }
        {RenderIf(active_step == 8 || active_step == 10)(
          <SceneFour_Portal resetScenes={this._resetScenes} exitApp={this.props.exitApp} sceneNavigator={this.props.sceneNavigator} passProps={this.props} />)
        }

        {/* Emmit Speeches */}
        {RenderIf(stepSpeech && stepSpeech.contains("V1"))(
          <ViroSound paused={!this.state.initialized} source={V1} onFinish={()=>this.setState({delaying:true})}/>)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V2"))(
          <ViroSound paused={!this.state.initialized} source={V2} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V3"))(
          <ViroSound paused={!this.state.initialized} source={V3} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V4"))(
          <ViroSound paused={!this.state.initialized} source={V4} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V5"))(
          <ViroSound paused={!this.state.initialized} source={V5} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V6"))(
          <ViroSound paused={!this.state.initialized} source={V6} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V7"))(
          <ViroSound paused={!this.state.initialized} source={V7} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V8"))(
          <ViroSound paused={!this.state.initialized} source={V8} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V9"))(
          <ViroSound paused={!this.state.initialized} source={V9} />)
        }
        {RenderIf(stepSpeech && stepSpeech.contains("V10"))(
          <ViroSound paused={!this.state.initialized} source={V10} />)
        }

      </ViroARScene>
    );
  }

  //setting ref
  _setARNodeRef(component) {
    this.arNodeRef = component;
  }

  _resetScenes = () => {
    this.props.setStep(0, questions[0]);
  }

  _onBeginTap = () => {
    var { active_step, active_step_data } = this.props.navigation_Reducer;
    var nextStep = active_step_data.Values['Begin'] + active_step;
    var nextStepData = questions[nextStep];

    console.log("Begin", active_step, active_step_data, nextStep, nextStepData);
    this.props.setStep(nextStep, nextStepData);
    this.arNodeRef.setNativeProps({ position: [0.5, 0.5, 0] });
  }

  _onYesTap() {
    var { active_step, active_step_data } = this.props.navigation_Reducer;
    var nextStep = active_step_data.Values['Yes'] + active_step;
    var nextStepData = questions[nextStep];

    console.log("Yes", active_step, active_step_data, nextStep, nextStepData);
    this.props.setStep(nextStep, nextStepData);
    this.arNodeRef.setNativeProps({ position: [0.5, 0.5, 0] });
  }

  _onSureTap() {
    var nextStep = 1;
    var nextStepData = questions[nextStep];

    console.log("Sure", nextStep, nextStepData);
    this.props.setStep(nextStep, nextStepData);
    this.arNodeRef.setNativeProps({ position: [0.5, 0.5, 0] });
  }

  _onNoTap() {
    var { active_step, active_step_data } = this.props.navigation_Reducer;
    var nextStep = active_step_data.Values['No'] + active_step;
    var nextStepData = questions[nextStep];

    console.log("No", active_step, active_step_data, nextStep, nextStepData);
    this.props.setStep(nextStep, nextStepData);
    this.arNodeRef.setNativeProps({ position: [0.5, 0.5, 0] });
  }

  _onExitTap() {
    console.log("Exit");
    this._resetScenes();
    this.props.exitApp();
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

    this.setState({
      buttonPosition: [10, 10, 5]
    })
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
      questionBoxVisible: true,
      initialized: true
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
    setStep: (step_number, stepData) => dispatch(setStep(step_number, stepData)),
  }
}

module.exports = connect(mstp, mdtp)(InitialAR_Scene);