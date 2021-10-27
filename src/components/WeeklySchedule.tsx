import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DateSpecs, DayStructure } from '../interfaces/appInterfaces';
import { setDateTimeToModal } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { ActivityNote } from '../shared/componentsManager';
import { hourActivityStructure, dateFormatted, dateSpectsToSystemDate, buildingWeek, getWorkDays } from '../helpers/helpersManager';
import { militaryHours } from '../data/dateTimeData';
import { colors, fontFamily } from '../styles/generalStyles';




export const WeeklySchedule = () => {

    const { activities, daySelected, dispatcher } = useContext(AppContext)
    const { setIsOpen, setModalType } = useContext(ModalsContext)
    const [ dayHourActivityStructure, setDayHourActivityStructure ] = useState<DayStructure[]>([])

    useEffect(() => {
        const { weekObj } = getWorkDays( buildingWeek( dateSpectsToSystemDate(daySelected)) );
        const structure = hourActivityStructure( weekObj, activities );
        setDayHourActivityStructure( structure );
    }, [daySelected, activities])
    

    const showCreateModal = (date: DateSpecs, time: string) => {
        const dateM = dateFormatted( date )
        dispatcher(setDateTimeToModal( dateM, time))
        setModalType('create');
        setIsOpen(true);
    }

    return (
        <ScrollView
            style={{ marginTop: 25 }}
            showsVerticalScrollIndicator={ false }
            >

            <ScrollView
                style={ styles.weekContainer }
                horizontal
                showsHorizontalScrollIndicator={ false }
                >
                    {   dayHourActivityStructure.map(({date, activitiesOfDate}, i) => (
                        <View
                            key={ i.toString()+date.monthNumber+'D' }
                            >
                            <View style={ styles.dayHeaderContainer } >
                                <Text style={ styles.dayHeaderText }>{ `${date.dayName} - ${date.day}` }</Text>
                            </View>

                            { /* Each activity */ }
                            {   activitiesOfDate.map(a => <ActivityNote key={ i.toString() + a.id } view='W' activity={ a } />) }

                            {   militaryHours.map((h, i) => (
                                    <View 
                                        key={ (i+h).toString() + 'H' } 
                                        style={ styles.calendarHourContainer}
                                        >
                                            <Text style={ styles.textHour }>{ `${ h }:00 ${h > 12 ? 'pm' : 'am' }` }</Text>
                                        <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:00`) } delayLongPress={ 500 }/>
                                        <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:15`) } delayLongPress={ 500 }/>
                                        <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:30`) } delayLongPress={ 500 }/>
                                        <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:45`) } delayLongPress={ 500 }/>
                                    </View>
                                ))
                            }
                        </View>
                    ))
                }
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    weekContainer: {
        flexDirection: 'row',
    },
    dayHeaderContainer: {
        width: 200,
        height: 50,
        backgroundColor: colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    dayHeaderText: {
        fontFamily: fontFamily.bold,
        color: 'white',
        fontSize: 14
    },
    calendarHourContainer: {
        height: 100,
        borderBottomWidth: .5,
        borderBottomColor: colors.lightGrey,
    },
    textHour: {
        fontFamily: fontFamily.bold,
        color: colors.lightGrey,
        fontSize: 16,
        position: 'absolute',
        top: 5,
        left: 10
    }
});