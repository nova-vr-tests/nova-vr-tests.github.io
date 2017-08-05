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
console.log(CGs)

const model = {
  LOGO: 0,
  EARTH: 1,
  MOON: 2,
}

export default class model_test extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.state = {
      rotation: 130,
      model: model.LOGO,
      scale: 0.1,
    };

    this.lastUpdate = Date.now();


    this.rotate = this.rotate.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getAllModels = this.getAllModels.bind(this);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if(this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }
  
  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      scale: this.state.scale + 1/100,
    })

    if (this.state.scale < 1)
      this.frameHandle = requestAnimationFrame(this.rotate);
  }

  getModel(model_number = 1, scale = 1){
    const CG = CGs[model_number];
    const CG_translate = CG.map(e => e*(1-scale));
    const translateZ = -10;
    const translate = CG_translate;
    translate[2] += translateZ;

    return (
      <View key={ model_number }>
        <AmbientLight />
        <Model
          source={{
            obj: asset('unilever_logo/' + model_number + '.obj'),
          }}
          lit={ true }
          style={{
            color: 'red',
            transform: [
              {translate},
              {scale}
            ]
          }}
        />
      </View>
    )
  }

  getAllModels() {
    const modelNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    const models = modelNames.map(e => this.getModel(e, this.state.scale));

    return <View>{ models }</View>
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

AppRegistry.registerComponent('model_test', () => model_test);
