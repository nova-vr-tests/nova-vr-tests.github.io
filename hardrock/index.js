
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
         {/* <Pano source={asset('chess-world.jpg')}/>  */}
        <Sphere
            style={{
                color: 'white',
                transform: [
                    {translate: [0,-501.8,0]},
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