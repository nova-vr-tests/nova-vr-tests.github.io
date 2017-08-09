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

import Paragraph from './paragraph'

export default class Page2 extends React.Component {
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
    const text="This is a major need for us to have a cloth look to numbers, \
because at the end of the day it's what makes the difference."

    return (
        <View
            style={{
                transform: this.props.transform,
                justifyContent: 'center',
                alignItems: 'center',
                width: 1.8,
            }} 
        >
            <Text
                style={{
                    color: 'white',
                    marginBottom: 0.07,
                    marginTop: 0.09,
                }} 
            >
                Media numbers
            </Text>          

            <Paragraph 
                main={text}
                kpi={[
                    ["4 hundred", "attendees"],
                    ["$97 thousand", "average HHI"],
                    ["73 percent", "of media earned"]
                ]}
            />
        </View>
    );
  }
};