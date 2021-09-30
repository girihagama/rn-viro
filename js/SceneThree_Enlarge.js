'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
    Viro360Video,
    ViroARScene,
    ViroNode,
} from 'react-viro';

class SceneThree_Enlarge extends Component {

    constructor() {
        super();

        this.state = {} // Set initial state here

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
    }

    state = {};

    render() {
        console.log("PROPS S3", this.props);
        
        return (
            <ViroARScene styles={styles.container}>
                <Viro360Video
                    source={require("./res/360_videos/SceneThree.mp4")}//{{ uri: "" }}
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

module.exports = SceneThree_Enlarge;