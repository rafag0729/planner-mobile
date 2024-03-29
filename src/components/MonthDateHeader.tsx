import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateSpecs } from '../interfaces/appInterfaces';
import { AppContext } from '../contexts/contextsManager';
import { getDateFromDateObj } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const MonthDateHeaders = () => {

    const { daySelected } = useContext(AppContext)
    const [ date, setDate ] = useState<DateSpecs>( getDateFromDateObj( new Date() ))

    useEffect(() => {   
        setDate({
            ...date,
            monthName: daySelected.monthName,
            year: daySelected.year
        })
    }, [daySelected.monthNumber])
    

    return (
        <View>
            <Text style={ styles.mainTextHead }>{ date.monthName } { date.year }</Text>
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