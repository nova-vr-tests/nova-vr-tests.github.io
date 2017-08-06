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

import { 
  translateThruLine,
  localRotateZ,
  addTransforms,
} from './linearTransforms'

export default class TranslateRotateLogo extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.state = {
      t: -15,
      alpha: 0,
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
      t: this.state.t - this.state.t * 1/10,
      alpha: this.state.alpha + 5,
    })

    if (this.state.t < 0 && this.state.alpha < 180)
      this.frameHandle = requestAnimationFrame(this.animate);
  }

  getModel(model_number = 1){
    // Copy CGs
    const CG = [...this.props.CGs[model_number]];
    const CGtemp = [...CG];

    // Handle axis to match react's
    CG[1] = CGtemp[2];
    CG[2] = CGtemp[1];

    // Translate through
    const origin = [0,0,2];

    // Direction vector
    const dirVect = origin.map((e,i) => e - CG[i]);

    // Parametrized line
    let transform = addTransforms([
      localRotateZ(this.state.alpha, CG),
      translateThruLine(origin, dirVect, this.state.t),
    ]);

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
            transform,
          }}
        />
      </View>
    )
  }

  getAllModels() {
    const modelNames = this.props.modelNames;
    const models = modelNames.map(e => this.getModel(e));

    return (
      <View
        style={{
          transform: [
            {translate: [0,-2,-10]},
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
            transform: [
              {translate: [0,-1,0]},
            ],
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
