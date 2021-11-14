'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
    Viro360Video,
    ViroARScene,
    ViroNode,
} from 'react-viro';

class SceneFour_Enlarge extends Component {

    constructor() {
        super();

        this.state = {} // Set initial state here

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this._onExit = this._onExit.bind(this);
    }

    state = {};

    render() {
        console.log("PROPS S4", this.props);
        
        return (
            <ViroARScene styles={styles.container}>
                <Viro360Video
                    source={require("./res/360_videos/SceneFour.mp4")}//{{ uri: "" }}
                    loop={false}
                    paused={false}
                    volume={1.0}
                    onFinish={() => { console.log('S4E Playback completed!'); this.props.resetScenes(); this.props.exitApp() }}
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

    _onExit() {
        this.props.exitApp();
        //this.props.sceneNavigator.push("Back", { scene: SceneOne_Portal }); //"InitialScene", { scene: InitialAR_Scene }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 8
    }
});

module.exports = SceneFour_Enlarge;