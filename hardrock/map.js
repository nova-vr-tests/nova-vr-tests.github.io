
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
  Box,
  Image,
} from 'react-vr';


export default class Map extends React.Component {
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
        <View
            style={{
                transform: this.props.transform,
            }} 
        >
            <Text
                style={{
                    borderWidth: 0.01,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                }} 
            >
                Elvis Rocks Mexico - Riviera Maya
            </Text>
            <View
                style={{
                    borderWidth: 0.01,
                    borderColor: 'rgba(255,255,255,0.1)',
                    height: 2,
                    width: 4.5,
                }} 
            >
                <Model
                    source={{ obj: asset('hardrock/map.obj') }}
                    style={{
                        color: 'white',
                        transform: [
                            {scale: [8, 8, 8]},
                            {translateX: -0.29}
                        ],
                    }}
                />
            </View>
        </View>
    );
  }
};

Map.defaultProps = {
    transform: [],
}