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

/**
 * Level 1 headers 
 * @param {object} props children
 */
const Title1 = props => (
    <Text
        style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 0.25,
            transform: [
                {translate: [0.1, 0.2, -1]},
            ],
            marginBottom: 0.2,
        }}
    >
        { props.children}
    </Text>
);

Title1.defaultProps = {
    children: "",
}

/**
 * Lever 2 headers 
 * @param {object} props children 
 */
const Title2 = props => (
    <Text
        style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 0.15,
            marginBottom: 0.07,
            marginTop: 0.09,
            transform: [
                {translate: [-0.5, 0.1, -0.5]},
            ],
            marginBottom: 0.2,
        }}
    >
        { props.children }
    </Text>
);

Title2.defaultProps = {
    children: "",
}

/**
 * 
 * @param {boolean} bg Should show paragram background 
 * @param {string} main Main textual content
 * @param {string[][]} kpi KPI information under textual content
 */
const Paragraph = props => (
    <View
        style={{
        }}
    >
        <View
            style={{
                backgroundColor: 'rgba(255, 255, 255,' + (props.bg ? '0.1' : '0') + ')',
            }}
        >
            <Text
                style={{
                    margin: 0.09,
                    fontSize: 0.06,
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
                    style={{ textAlign: 'center', fontSize: 0.06 }} 
                >
                    {props.kpi[0][0]}
                </Text>
                <Text
                    style={{ textAlign: 'center', fontSize: 0.06 }} 
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
                    style={{ textAlign: 'center', fontSize: 0.06 }} 
                >
                    {props.kpi[1][0]}
                </Text>
                <Text
                    style={{ textAlign: 'center', fontSize: 0.06 }} 
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
                    style={{ textAlign: 'center', fontSize: 0.06 }} 
                >
                    {props.kpi[2][0]}
                </Text>
                <Text
                    style={{ textAlign: 'center', fontSize: 0.06 }} 
                >
                    {props.kpi[2][1]}
                </Text>
            </View>
        </View>
    </View>
)

Paragraph.defaultProps = {
    bg: true,
}


export {
    Title1,
    Title2,
    Paragraph,
}