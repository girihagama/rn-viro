'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
    ViroPortalScene,
    ViroPortal,
    Viro360Video,
    Viro3DObject,
    ViroSound
} from 'react-viro';

import SceneFour_Enlarge from './SceneFour_Enlarge';

class SceneFour_Portal extends Component {
    constructor() {
        super();

        this.state = {
            play : false
        } // Set initial state here
    }

    state = {
        play: false,
        enlarge: false,
    }

    render() {
        console.log("PROPS S4E", this.props);

        return (
            <ViroPortalScene passable={false}>
                <ViroPortal position={[0, 8, 5]} scale={[.1, .1, .1]} onClick={() => { this.enlargeScene() }}>
                    <Viro3DObject source={require('./portals/portal_res/3d-model.obj')}
                        resources={[
                            require('./portals/portal_res/3d-model.mtl'),
                        ]}
                        position={[30, -50, -70]}
                        scale={[0.75, 0.75, 0.75]}
                        rotation={[0, -50, 0]}
                        type="OBJ" />
                </ViroPortal>
                {
                    (this.state.play) ?
                        <Viro360Video paused={!this.state.play} muted={true} source={require("./res/360_videos/SceneFour.mp4")} loop={false} />
                        :
                        <ViroSound
                            source={require("./res/music/PortalAppear.wav")} onFinish={() => { this.setState({ play: true }) }}
                        />
                }
            </ViroPortalScene>
        );
    }

    enlargeScene() {
        console.log("Enlarging - Scene 4");
        this.setState({ play: false });
        this.props.sceneNavigator.jump("Scene4E", { scene: SceneFour_Enlarge, passProps: {exitApp: this.props.exitApp, resetScenes:this.props.resetScenes} });
    }
}

module.exports = SceneFour_Portal;
//export default SceneTwo_Portal;