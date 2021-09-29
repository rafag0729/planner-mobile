import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../styles/generalStyles';




interface Props {
    text: string;
    settingHour: (time: Date | undefined, timerTitle: 'startTime' | 'endTime') => void;
    timerText: 'startTime' | 'endTime'
}

export const TimeSelector = ({ settingHour, timerText, text}: Props) => {

    const [pickerStatus, setPickerStatus] = useState<boolean>( false );

    return (
        <>
        {/* First time input */}
        <TouchableOpacity
            style={{ ...styles.inputContainer, flex: 1 }}
            onPress={ () => {
                setPickerStatus( true );
            }}
            >
            <Text style={{ color: 'grey' }}><Text style={ styles.requiredIndicator }>*</Text> { text }</Text>
        </TouchableOpacity>
        {   pickerStatus && (
                <DateTimePicker 
                    mode='time'
                    minuteInterval={ 15 }
                    value={ new Date() }
                    onChange={ (e: AndroidEvent, date: Date | undefined) => {
                        settingHour( date, timerText);
                        setPickerStatus( false );
                    }}
                    />
        )}
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        fontSize: 16,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 2,
        padding: 7,
        color: colors.regularGrey,
    },
    requiredIndicator: {
        color: colors.customRed,
    }
})