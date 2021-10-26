import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateSpecs } from '../interfaces/appInterfaces';
import { AppContext } from '../contexts/contextsManager';
import { getDateFromDateObj, buildingWeek, dateSpectsToSystemDate } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const WeekDateHeaders = () => {

    const { daySelected } = useContext(AppContext)
    const [ date, setDate ] = useState<DateSpecs>( getDateFromDateObj( new Date() ))
    const [week, setWeek] = useState<DateSpecs[]>([])

    useEffect(() => {   
        const { weekObj } = buildingWeek( dateSpectsToSystemDate(daySelected) )
        setDate({
            ...date,
            monthName: daySelected.monthName,
            year: daySelected.year
        })
        setWeek( weekObj )
    }, [daySelected])
    

    return (
        <View>
            <Text style={ styles.mainTextHead }>{ date.monthName } { date.year }</Text>
            <Text style={ styles.subTextHead }>Del { week[0]?.day } al { week[week.length-1]?.day }</Text>
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