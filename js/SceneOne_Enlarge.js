'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
    Viro360Video,
    ViroARScene,
} from 'react-viro';
import { connect } from 'react-redux/src';

class SceneOne_Enlarge extends Component {

    constructor() {
        super();

        this.state = {} // Set initial state here

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
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
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#888888",
        padding: 8
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