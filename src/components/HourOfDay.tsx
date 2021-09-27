import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Activity } from './Activity';
import { colors, fontFamily } from '../styles/generalStyles';


interface Props {
    hour: number,
    hourOfDay: string
}

export const HourOfDay = ({ hour, hourOfDay }: Props) => {
    return (
        <View style={ styles.calendarHourContainer } >
            <View style={{ flex: 1}}>
                <Text style={ styles.textHour }>{ hourOfDay }</Text>
            </View>
            <View style={{ flex: 2}} >
                {/* <Activity /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    calendarHourContainer: {
        height: 100,
        borderBottomWidth: .5,
        borderBottomColor: colors.lightGrey,
        flexDirection: 'row'
    },
    textHour: {
        fontFamily: fontFamily.bold,
        color: colors.lightGrey,
        fontSize: 22,
        position: 'relative',
        top: 5,
        left: 10
    }
});