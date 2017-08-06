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
import Translatelogo from './translatelogo';

export default class Unilever extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
  }

  render() {
    return (
      // <Zoomlogo />
      <Translatelogo />
    );
  }
};

AppRegistry.registerComponent('model_test', () => Unilever);
