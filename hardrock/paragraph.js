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
} from 'react-vr';

export default class Page1 extends React.Component {
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
            }}
        >
            <View
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
            >
                <Text
                    style={{
                        margin: 0.03,
                        fontSize: 0.07,
                    }}
                >
                    {this.props.main}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 0.3,
                }}
            >
                <View style={{
                    borderWidth: 0.008, 
                    borderRightWidth: 0,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    flex: 1,
                    alignItems: 'center', 
                    justifyContent: 'center',
                }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 0.05 }} 
                    >
                        {this.props.kpi[0][0]}
                    </Text>
                    <Text
                        style={{ textAlign: 'center', fontSize: 0.05 }} 
                    >
                        {this.props.kpi[0][1]}
                    </Text>
                </View>
                <View style={{
                    borderWidth: 0.008, 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    flex: 1,
                    alignItems: 'center', 
                    justifyContent: 'center',
                }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 0.05 }} 
                    >
                        {this.props.kpi[1][0]}
                    </Text>
                    <Text
                        style={{ textAlign: 'center', fontSize: 0.05 }} 
                    >
                        {this.props.kpi[1][1]}
                    </Text>
                </View>
                <View style={{
                    borderWidth: 0.008, 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    flex: 1,
                    borderLeftWidth: 0,
                    alignItems: 'center', 
                    justifyContent: 'center',
                }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 0.05 }} 
                    >
                        {this.props.kpi[2][0]}
                    </Text>
                    <Text
                        style={{ textAlign: 'center', fontSize: 0.05 }} 
                    >
                        {this.props.kpi[2][1]}
                    </Text>
                </View>
            </View>
        </View>
    );
  }
};