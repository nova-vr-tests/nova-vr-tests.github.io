import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Sphere,
  AmbientLight,
  Scene,
  NativeModules,
  VrButton,
  Animated,
} from 'react-vr';

import Zoomlogo from './zoomlogo';
import Rotatelogo from './rotatelogo';
import Translatelogo from './translatelogo';
import TranslateRotateLogo from './translateRotateLogo';
import CGs from "./static_assets/unilever_logo/gravity.js";

import Hardrock from "./hardrock/index"

 class FadeInView extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       fadeAnim: new Animated.Value(0), // init opacity 0
     };
   }
   componentDidMount() {
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1}            // Configuration
     ).start();                // Don't forget start!
   }
   render() {
     return (
       <Animated.View          // Special animatable View
         style={{opacity: this.state.fadeAnim}}> // Binds
         {this.props.children}
       </Animated.View>
     );
   }
 }

export default class Unilever extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.modelNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    this.CGs = CGs;

    this.animate = this.animate.bind(this);

    this.state = {
      opacity1: 1,
      opacity2: -1,
      timer: 0,
    };

  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    if(this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  animate() {
    if(this.state.timer < 1000) {
      this.setState({ timer: this.state.timer + 10 });
    } else {
      this.setState({
        opacity1: this.state.opacity1 - 1/20,
        opacity2: this.state.opacity2 + 1/20,
      });
    }

    if (this.state.opacity2 <= 1)
      this.frameHandle = requestAnimationFrame(this.animate);
  }

  render() {
    return (
      // <Zoomlogo modelNames={ this.modelNames } CGs={ this.CGs } />
      // <Translatelogo modelNames={ this.modelNames } CGs={ this.CGs } />
      // <TranslateRotateLogo modelNames={ this.modelNames } CGs={ this.CGs } />
      // <Rotatelogo modelNames={ this.modelNames } CGs={ this.CGs } />

      <View>
        <Model
          source={{
            obj: asset('hardrock/logo3.obj')
          }}
          style={{
            opacity: this.state.opacity1,
            transform: [
              {translate: [-2.5,0.2,-1]},
              {scale: 2}
            ],
            color: 'yellow',
          }}
        />
        <View style={{opacity:this.state.opacity2}}>
          <Hardrock />
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('model_test', () => Unilever);
