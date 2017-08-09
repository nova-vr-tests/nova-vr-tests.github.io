
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

import Page1 from './page1'
import Page2 from './page2'

export default class Hardrock extends React.Component {
  constructor(scene) {
    super();

    this.scene = scene;
    
    this.state = {
    };

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
  render() {
    return (
      <Scene>
        <AmbientLight />
        <Pano source={asset('hardrock/bg.jpg')} />  
        <Page1 
            transform={[
                {translate: [0.5,1.3,-3]}
            ]}
        />
        <Page2 
            transform={[
                {translate: [1,3,0.7]},
                {rotateY: 270}
            ]}
        />
        <Sphere
            style={{
                color: 'white',
                transform: [
                    {translate: [0,-502,0]},
                ]
            }}
            radius={500}
            lit={true}
            heightSegments={5000}
            widthSegments={500}
        />
      </Scene>
    );
  }
};