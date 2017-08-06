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
} from 'react-vr';

import Zoomlogo from './zoomlogo';
import Rotatelogo from './rotatelogo';
import Translatelogo from './translatelogo';
import TranslateRotateLogo from './translateRotateLogo';
import CGs from "./static_assets/unilever_logo/gravity.js";

export default class Unilever extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.modelNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    this.CGs = CGs;
  }

  render() {
    return (
      // <Zoomlogo modelNames={ this.modelNames } CGs={ this.CGs } />
      // <Translatelogo modelNames={ this.modelNames } CGs={ this.CGs } />
      <TranslateRotateLogo modelNames={ this.modelNames } CGs={ this.CGs } />
      // <Rotatelogo modelNames={ this.modelNames } CGs={ this.CGs } />
    );
  }
};

AppRegistry.registerComponent('model_test', () => Unilever);
