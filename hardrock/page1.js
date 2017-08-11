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
                bg={true}
                main={text}
                kpi={[
                    ["280 thousands", "contest entries"],
                    ["$2.59 million", "media/pr value"],
                    ["86 million", "social impressions"]
                ]}
            />

            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 0.1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 0.1,
                            marginLeft: 0.05,
                        }}
                    >
                        Gross Impressions    
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'flex-end',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 0.1,
                            fontWeight: 'bold',
                            paddingRight: 0.05,
                        }}
                    >
                        201,008,806
                    </Text>
                </View>
            </View>
        </View>
    );
  }
};