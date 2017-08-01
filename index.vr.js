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
} from 'react-vr';

export default class model_test extends React.Component {
  render() {
    return (
      <View>
        <AmbientLight intensity={ 2.6 }  />
        <Model 
          source={{ 
            obj: asset('earth/earth.obj'),
            mtl: asset('earth/earth.mtl'),
          }} 
          lit={ true }
          style={{
            transform: [
              {translate: [-25, 0, -70]},
              {scale: 0.05 },
              {rotateY: -130},
              {rotateX: 20},
              {rotateZ: -10}
            ],
          }}
        />
        <Model 
          style={{ 
            transform: [ 
              {translate: [10, 10, -100]}, 
              {scale: 0.05}, 
            ], 
          }} 
          source={{
            obj:asset('moon/moon.obj'), 
            mtl:asset('moon/moon.mtl')
          }} 
          lit={true} />
        {/* <Sphere></Sphere> 
          texture={ asset('earth/4096_earth.jpg')} 
          style={{
            transform: [
              {translate: [-25, 0, -70]},
              {scale: 30 },
              {rotateY: -130},
              {rotateX: 20},
              {rotateZ: -10}
            ],
          }}
        /> */}
      </View>
    );
  }
};

AppRegistry.registerComponent('model_test', () => model_test);
