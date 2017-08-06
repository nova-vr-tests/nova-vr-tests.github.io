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

export default class Zoomlogo extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.state = {
      scale: 0.01,
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
      scale: this.state.scale + 1/200,
    })

    if (this.state.scale < 1)
      this.frameHandle = requestAnimationFrame(this.animate);
  }

  getModel(model_number = 1, scale = 1){
    // Copy CGs
    const CG = [...this.props.CGs[model_number]];
    const CGtemp = [...CG];

    // Handle axis to match react's
    CG[1] = CGtemp[2];
    CG[2] = CGtemp[1];

    // Calculate distance between original and translated CGs
    const CG_translate = CG.map(e => e*(1-scale));

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
              {translate: CG_translate},
              {scale}
            ]
          }}
        />
      </View>
    )
  }

  getAllModels() {
    const modelNames = this.props.modelNames;
    const models = modelNames.map(e => this.getModel(e, this.state.scale));

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
