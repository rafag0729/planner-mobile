import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppContext } from '../context/AppContext';
import { DateSpecs } from '../interfaces/appInterfaces';
import { getDateSpecs } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const DateHeaders = () => {

    const { daySelected } = useContext(AppContext)
    const [ date, setDate] = useState<DateSpecs>( getDateSpecs( new Date() ))

    useEffect(() => {
        
        const { day, dayName, month, year } = getDateSpecs( daySelected );
        setDate({
            ...date,
            day,
            dayName,
            month,
            year
        })

    }, [daySelected])

    return (
        <View>
            <Text style={ styles.mainTextHead }>{ date.month } { date.year }</Text>
            <Text style={ styles.subTextHead }>{ date.dayName } { date.day }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainTextHead: {
        fontSize: 36,
        color: colors.darkBlue,
        fontFamily: fontFamily.bold,
        marginTop: 10
    },
    subTextHead: {
        marginTop: -20,
        fontSize: 28,
        fontFamily: fontFamily.bold,
        color: colors.primaryBlue
    },    
});