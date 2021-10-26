import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { ActivityPerDayForMonth, DateSpecs } from '../interfaces/appInterfaces';
import { AppContext } from '../contexts/contextsManager';
import { setDate } from '../reducer/appActions';
import { ActivityStick } from '../shared/componentsManager';
import { useActivityPetition } from '../hooks/hooksManager';
import { monthlyDayActivityStructure} from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';



export const MonthlySchedule = () => {

    const navigation = useNavigation()
    const {activities, daySelected, dispatcher} = useContext(AppContext)
    const [monthActivities, setMonthActivities] = useState<ActivityPerDayForMonth[]>([])
    const [initialDate, setInitialDate] = useState( new Date() )
    
    useEffect(() => {
        const monthStructure = monthlyDayActivityStructure( daySelected, activities );
        setMonthActivities( monthStructure )
        setInitialDate( new Date(monthStructure[0].day.year, monthStructure[0].day.monthNumber, monthStructure[0].day.day) )
    }, [daySelected.monthNumber, activities])

    const navigateToDateScreen = (date: DateSpecs) => {
        const dateToGo = new Date( date.year, date.monthNumber, date.day )
        dispatcher( setDate( dateToGo ) )
        navigation.navigate('DailyScreen' as any)        
    }
    
    return (
        <ScrollView
            style={{ marginTop: 25 }}
            showsVerticalScrollIndicator={ false }
            >
            <View style={{ flex: 1}} >
                <View style={ styles.dayHeaderContainer }>
                    <View style={{ width: 70 }}><Text style={ styles.dayHeaderText }>L</Text></View>
                    <View style={{ width: 70 }}><Text style={ styles.dayHeaderText }>M</Text></View>
                    <View style={{ width: 70 }}><Text style={ styles.dayHeaderText }>M</Text></View>
                    <View style={{ width: 70 }}><Text style={ styles.dayHeaderText }>J</Text></View>
                    <View style={{ width: 70 }}><Text style={ styles.dayHeaderText }>V</Text></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                    <View style={{ width: (initialDate.getDay() - 1) * 70 }}/>
                    {   monthActivities.map((d, i) => (
                                <TouchableOpacity 
                                    key={ (d.day.day + i).toString() }
                                    onPress={ () => navigateToDateScreen(d.day) }
                                    style={ styles.eachDayContainer }>
                                    <Text style={ styles.textDay }>{d.day.day}</Text>

                                    {   d.activity.map((a, i) => (
                                            <ActivityStick 
                                                key={ i.toString() }
                                                activity={ a } />
                                        ))
                                    }
                                </TouchableOpacity>
                            )
                        )
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    monthContainer: {
        flex: 1, 
        flexDirection: 'row'
    },
    daysColumnContainer: {
        flex: 1,
    },
    dayHeaderContainer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: colors.lightBlue,
        alignItems: 'center'
    },
    dayHeaderText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontFamily: fontFamily.bold,
        marginTop: 4
    },
    eachDayContainer: {
        height: 70,
        width: 70,
        borderColor: colors.lightGrey,
        borderWidth: .5,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingBottom: 15
    },
    textDay: {
        fontFamily: fontFamily.bold,
        color: colors.lightGrey,
        fontSize: 16,
        position: 'absolute',
        top: 0,
        right: 5
    }
});