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

import { Paragraph, Title1, Title2 } from './UI'

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
    const text="Live from Mexico we broadcasted a weekend of dysfunctinal familly \
fun to 63 million people. Live music performance from Nick Jonas and \
Brett Michaels, all the beach, spa and partying anyone person \
could handle."

    return (
        <View
            style={{
                transform: this.props.transform,
                justifyContent: 'center',
                alignItems: 'center',
                width: 2.0,
            }} 
        >
            <Title1>
                Elvis Rock Mexico
            </Title1>          
            <Title2>
                Hard Rock Hotel
            </Title2>          

            <Paragraph 
                bg={false}
                main={text}
                kpi={[
                    ["280 thousands", "contest entries"],
                    ["$2.59 million", "media/pr value"],
                    ["86 million", "social impressions"]
                ]}
            />
        </View>
    );
  }
};