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
                       height: 1.8,
                       paddingBottom: 0.2,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 0.1 }}>
                        <Image 
                            source={require('../static_assets/hardrock/page2/1.png')} 
                            style={{
                                width: 1,
                                height: 1,
                                borderRadius: 0.1, 
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', paddingLeft: 0.1 }}>
                        <Image 
                            source={require('../static_assets/hardrock/page2/1.png')} 
                            style={{
                                width: 1,
                                height: 1,
                                borderRadius: 0.1, 
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
                        source={require('../static_assets/hardrock/page2/1.png')} 
                        style={{
                            width: 1,
                            height: 1,
                            borderRadius: 0.1, 
                        }}
                    />
                </View>
            </View>
        </View>
    );
  }
};