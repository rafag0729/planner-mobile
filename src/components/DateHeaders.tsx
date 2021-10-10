import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateSpecs } from '../interfaces/appInterfaces';
import { AppContext } from '../contexts/contextsManager';
import { getDateFromDateObj } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const DateHeaders = () => {

    const { daySelected } = useContext(AppContext)
    const [ date, setDate] = useState<DateSpecs>( getDateFromDateObj( new Date() ))

    useEffect(() => {   
        const { day, dayName, monthName, year } = getDateFromDateObj( daySelected );
        setDate({
            ...date,
            day,
            dayName,
            monthName,
            year
        })

    }, [daySelected])

    return (
        <View>
            <Text style={ styles.mainTextHead }>{ date.monthName } { date.year }</Text>
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
        color: colors.lightBlue
    },    
});