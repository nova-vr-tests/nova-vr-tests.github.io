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
    };

    this.lastUpdate = Date.now();


    this.rotate = this.rotate.bind(this);
    this.changeModel = this.changeModel.bind(this);
    this.getButtonLabel = this.getButtonLabel.bind(this);
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
      rotation: this.state.rotation + delta / 150,
    })

    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  changeModel(e) {
    if (this.state.model >= model.MOON)
      this.setState({ model: model.LOGO })
    else
      this.setState({ model: this.state.model + 1})
  }

  getButtonLabel() {
    var textEnd = "";
    switch (this.state.model) {
      case model.EARTH:
        textEnd = 'earth';
        break;
      case model.MOON:
        textEnd = 'moon';
        break;
      case model.LOGO:
        textEnd = 'logo';
        break;
      default:
        textEnd = 'error';
    }

    return "hide " + textEnd;
  }

  getModels() {
    return (
      <View>
        <Model
          source={{
            obj: asset('unilever/unilever.obj')
          }}
          lit={ true }
          style={{
            transform: [
              {translate: [-1, 0, -50]},
              {scale: scaling === 0 || this.state.model !== model.LOGO ? 0.001 : scaling},
              {rotateX: 90},
              {rotateZ: this.state.rotation * 4},
            ]
          }}
        />
        <Model 
          source={{ 
            obj: asset('earth/earth.obj'),
            mtl: asset('earth/earth.mtl'),
          }} 
          lit={ true }
          style={{
            transform: [
              {translate: [-25, 0, -70]},
              {scale: this.state.model === model.EARTH ? 0.05 : 0.0001 },
              {rotateY: this.state.rotation},
              {rotateX: 20},
              {rotateZ: -10}
            ],
          }}
        />
        <Model 
          style={{ 
            transform: [ 
              {translate: [10, 10, -100]}, 
              {scale: this.state.model === model.MOON ? 0.05 : 0.0001 },
            ], 
          }} 
          source={{
            obj:asset('moon/moon.obj'), 
            mtl:asset('moon/moon.mtl')
          }} 
          lit={true} />
        </View>
    )
  }

  render() {
    const scaling = 90 //* Math.abs(Math.sin(this.state.rotation * Math.PI / 180));

    return (
      <Scene>
      <View>
        <AmbientLight intensity={ 2.6 }  />
        <VrButton 
          onClick={ this.changeModel } >
          <View
            style={{
              backgroundColor: 'red',
              height: 0.3,
              width: 1,
              transform: [
                {translate: [0.5, 1, -2]},
              ]
            }}>
              <Text>{ this.getButtonLabel() }</Text>
          </View>
        </VrButton>
        <Model 
          style={{ 
            layoutOrigin: [0,0,0],
            transform: [ 
              {translate: [0,-10,0]},
              {rotateX: 45},
              {scale: 0.05},
            ], 
          }} 
          source={{
            obj:asset('city/The City.obj'), 
            mtl:asset('city/The_City.mtl'), 
          }} 
          lit={true} />
          <Sphere
            radius={5}
            lit={true}
            style={{
              layoutOrigin: [0,0]
            }}
          />
      </View>
      </Scene>
    );
  }
};

AppRegistry.registerComponent('model_test', () => model_test);
