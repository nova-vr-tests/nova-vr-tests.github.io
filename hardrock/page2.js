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

import { Paragraph, Title1, Title2 } from './UI'

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
    const text="Over the weekend hundreds lived life to the fullest via Hard Rock's \
all inclusive, while millions enjoyed vicariously. The program earned more than \
85 million impressions on social media, alone."
    return (
        <View
            style={{
                flexDirection: 'row',
                transform: this.props.transform,
            }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 1.8,
                }} 
            >
                <Title2>
                    Media numbers
                </Title2>

                <Paragraph 
                    main={text}
                    kpi={[
                        ["4 hundred", "attendees"],
                        ["$97 thousand", "average HHI"],
                        ["73 percent", "of media earned"]
                    ]}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    transform: [
                        {translate: [0.2,0,0]}
                    ]
                }}
            >
                <View
                    style={{
                       flex: 1, 
                       flexDirection: 'row',
                       height: 1.6,
                       paddingBottom: 0.1,
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 0.05 }}>
                        <Image 
                            source={asset("hardrock/page2/1.png")}
                            style={{
                                width: 1,
                                height: 1,
                                borderRadius: 0.1, 
                                transform: [
                                    {translate: [0, 0, -2]},
                                    {scale: 1},
                                ]
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingLeft: 0.05}}>
                        <Image 
                            source={asset("hardrock/page2/2.png")}
                            style={{
                                width: 1,
                                height: 1,
                                borderRadius: 0.1, 
                                transform: [
                                    {translate: [0, 0, 0]},
                                    {scale: 1},
                                ]
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                       flex: 1, 
                       justifyContent: 'center',
                       alignItems: 'center',
                    }}
                >
                    <Image 
                        source={asset("hardrock/page2/3.png")}
                        style={{
                            width: 1,
                            height: 1,
                            borderRadius: 0.1,
                            transform: [
                                {translate: [0, 0, -1]},
                                {scale: 1},
                            ]
                        }}
                    />
                </View>
            </View>
        </View>
    );
  }
};