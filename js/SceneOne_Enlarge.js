'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Dialog from "react-native-dialog";

import {
    Viro360Video,
    ViroARScene,
    ViroScene,
} from 'react-viro';
import { connect } from 'react-redux/src';

class SceneOne_Enlarge extends Component {

    constructor() {
        super();

        this.state = {
            videoTime: 0,
            totalTime: 0
        } // Set initial state here

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this._onUpdateTime = this._onUpdateTime.bind(this);
        this._onExit = this._onExit.bind(this);
        this._onError = this._onError.bind(this);
        this.renderCloseButton = this.renderCloseButton.bind(this);
    }

    state = {
        playbackMilestone1: false
    };

    render() {
        console.log({
            //"PROPS S1": this.props,
            "STATE": this.state
        });

        return (
            <ViroARScene styles={styles.container} renderingOrder={0}>
                <Viro360Video
                    source={require("./res/360_videos/SceneOne.mp4")}//{{ uri: "" }}
                    loop={false}
                    paused={false}
                    volume={1.0}
                    rotation={[0, 50, 0]}
                    renderingOrder={-1}
                    onFinish={() => { console.log('S1E Playback completed!'); this.props.resetScenes(); this.props.exitApp() }}
                    onUpdateTime={this._onUpdateTime}
                    onError={this._onError}
                />
            </ViroARScene>
        );
    }

    _onInitialized(state) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            console.log("Tracking Available");
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
            console.log("Tracking Lost");
        }

        this.renderCloseButton();
    }

    _onError() {
        return (
            Alert.alert(
                "Tracking Alert",
                "Sorry! We are unable to enlarge the scene. Please reload.",
                [
                    {
                        text: 'OK', onPress: () => {
                            console.log('Pressed')
                        }
                    },
                ],
                { cancelable: true }
            )
        )
    }

    _onUpdateTime(current, total) {
        current = Math.round(current);
        total = Math.round(total);
        this.setState({
            videoTime: current,
            totalTime: total
        });
        console.log("Video time update, current: " + current + ", total: " + total);

        if (!this.state.playbackMilestone1 && Math.round(current) > 5) {
            console.log("Playback milestone reached");

            this.setState({
                playbackMilestone1: true
            })

            return (
                Alert.alert( //Alert.alert
                    "Voice Input",
                    "Appear Input Modal To Get Voice Inputs",
                    [
                        {
                            text: 'Close', onPress: () => {
                                console.log('Message Closed!');
                            }
                        },
                    ],
                    { cancelable: true }
                )
            )
        }

        // if(Math.round(current) === Math.round(total)){
        //     console.log("Playback finished");
        //     this.props.exitApp;
        // }
    }

    _onExit() {
        this.props.exitApp();
        //this.props.sceneNavigator.push("Back", { scene: SceneOne_Portal }); //"InitialScene", { scene: InitialAR_Scene }
    }

    renderCloseButton = () => {
        console.log("Adding close button..");
        return (
            <View style={{ position: 'absolute' }}>
                <Text>Hello</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});

const mstp = (state) => {
    return state;
}

const mdtp = (dispatch) => {
    return {
        //initializeStore: (question) => dispatch(initializeStore(question)),
    }
}

module.exports = connect(mstp, mdtp)(SceneOne_Enlarge);