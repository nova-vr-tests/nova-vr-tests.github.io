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

import CGs from "./static_assets/unilever_logo/gravity.js";

export default class Translatelogo extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.state = {
      t: -10,
    };

    this.animate = this.animate.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getAllModels = this.getAllModels.bind(this);
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
    this.setState({
      t: this.state.t + 1/20,
    })

    if (this.state.t < 0)
      this.frameHandle = requestAnimationFrame(this.animate);
  }

  getModel(model_number = 1){
    // Copy CGs
    const CG = [...CGs[model_number]];
    const CGtemp = [...CG];

    // Handle axis to match react's
    CG[1] = CGtemp[2];
    CG[2] = CGtemp[1];

    // Translate through
    const origin = [0,0,0];

    // Direction vector
    const dirVect = origin.map((e,i) => e - CG[i]);

    // Paramnetrized line
    const currentCoord = dirVect.map((e,i) => origin[i] + e * this.state.t);

    return (
      <View key={ model_number }>
        <AmbientLight />
        <Model
          source={{
            obj: asset('unilever_logo/' + model_number + '.obj'),
            mtl: asset('unilever_logo/' + model_number + '.mtl'),
          }}
          lit={ true }
          style={{
            transform: [
              {translate: currentCoord},
            ]
          }}
        />
      </View>
    )
  }

  getAllModels() {
    const modelNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    const models = modelNames.map(e => this.getModel(e));

    return (
      <View
        style={{
          transform: [
            {translate: [0,0,-10]},
          ],
        }} 
      >
        { models }
        <Model
          source={{
            obj: asset('unilever_logo/0.obj'),
          }}
          lit={ true }
          style={{
            color: 'red',
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <Scene>
        <AmbientLight />
        { this.getAllModels() }
      </Scene>
    );
  }
};
