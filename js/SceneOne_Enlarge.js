'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

import {
    Viro360Video,
    ViroARScene,
} from 'react-viro';
import { connect } from 'react-redux/src';

import { InitialAR_Scene } from './InitialAR_Scene';

class SceneOne_Enlarge extends Component {

    constructor() {
        super();

        this.state = {} // Set initial state here

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this._onExit = this._onExit.bind(this);
        this._onError = this._onError.bind(this);
    }

    state = {};

    render() {
        console.log("PROPS S1", this.props);

        return (
            <ViroARScene styles={styles.container}>
                <Viro360Video
                    source={require("./res/360_videos/SceneOne.mp4")}//{{ uri: "" }}
                    loop={false}
                    paused={false}
                    volume={1.0}
                    rotation={[0, 50, 0]}
                    onFinish={this._onExit}
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
    }

    _onError() {
        return (
            Alert.alert(
                "Tracking Alert",
                "The tracking is available",
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

    _onExit() {
        this.props.sceneNavigator.pop(2);
    }

    renderCloseButton() {
        return (
            <View style={{ position: 'absolute', left: 10, top: 10, width: 10, height: 10 }}>
                <Text>Hello</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
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