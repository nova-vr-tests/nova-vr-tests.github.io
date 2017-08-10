
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

export default class Orbit extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.state = {
        alpha: 0,
    };

    this.animate = this.animate.bind(this);
    this.getPosition = this.getPosition.bind(this);
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
      alpha: this.state.alpha + 1/400,
    })

    this.frameHandle = requestAnimationFrame(this.animate);
  }

  getPosition() {
      const { alpha } = this.state;
      const R = 8000;   // Orbit radius

      const e_x = [0, 0, 1];
      const e_y = [1, 0, 0];
      const C = [0, 0, 0];

      return [
        C[0] + R * Math.cos(alpha) * e_x[0] + R * Math.sin(alpha) * e_y[0],
        C[1] + R * Math.cos(alpha) * e_x[1] + R * Math.sin(alpha) * e_y[1],
        C[2] + R * Math.cos(alpha) * e_x[2] + R * Math.sin(alpha) * e_y[2],
      ];
  }

  render() {
    return (
      <View
        style={{
          transform: [
            {rotateZ: 45}
          ]
        }}
      >
          <Sphere
            style={{
                transform: [
                    {translate: this.getPosition()},
                ],
                color: 'white',
            }}
            radius={ 200 }
           /> 
      </View>
    );
  }
};
