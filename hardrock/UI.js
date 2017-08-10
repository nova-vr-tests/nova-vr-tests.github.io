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

import Page1 from './page1';
import Page2 from './page2';
import Orbit from './orbit';
import Map from './map';

const Title1 = props => (
    <Text
        style={{
            color: 'white',
            fontSize: 0.2,
        }}
    >
        { this.props.text }
    </Text>
);

Title1.defaultProps = {
    text: "",
}

const Title2 = props => (
    <Text
        style={{
            color: 'white',
            marginBottom: 0.07,
            marginTop: 0.09,
        }}
    >
        { this.props.text }
    </Text>
);

Title2.defaultProps = {
    text: "",
}

const Paragraph = props => (
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
                {props.main}
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
                    {props.kpi[0][0]}
                </Text>
                <Text
                    style={{ textAlign: 'center', fontSize: 0.05 }} 
                >
                    {props.kpi[0][1]}
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
                    {props.kpi[1][0]}
                </Text>
                <Text
                    style={{ textAlign: 'center', fontSize: 0.05 }} 
                >
                    {props.kpi[1][1]}
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
                    {props.kpi[2][0]}
                </Text>
                <Text
                    style={{ textAlign: 'center', fontSize: 0.05 }} 
                >
                    {props.kpi[2][1]}
                </Text>
            </View>
        </View>
    </View>
)


export {
    Title1,
    Title2,
    Paragraph,
}