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

import { Paragraph } from './UI'

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
could handle..."

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
                    fontSize: 0.2,
                }} 
            >
                Implication in musicCC
            </Text>          
            <Text
                style={{
                    color: 'white',
                    marginBottom: 0.07,
                    marginTop: 0.09,
                }} 
            >
                Elvis rocks Mexico - Riviera Maya
            </Text>          

            <Paragraph 
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