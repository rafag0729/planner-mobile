import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Activity } from '../interfaces/appInterfaces';
import { fontFamily } from '../styles/generalStyles';



interface Props {
    activity: Activity;
}

export const ActivityStick = ({ activity }: Props) => {
    return (
        <View
            style={{ 
                ...styles.activityStickContainer,
                backgroundColor: activity.projectName.color
            }}
            >
            <Text style={ styles.activityStickText }>
                { activity.projectName.name.substring(0,1) }    
            </Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    activityStickContainer: {
        width: 22,
        height: 22,
        backgroundColor: 'grey',
        marginRight: 2
    },
    activityStickText: {
        fontFamily: fontFamily.bold,
        color: 'white',
        textAlign: 'center'
    }
});