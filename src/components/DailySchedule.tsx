import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DayStructure, DateSpecs } from '../interfaces/appInterfaces';
import { setDateTimeToModal } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { ActivityNote } from './../shared/componentsManager';
import { hourActivityStructure, dateFormatted } from '../helpers/helpersManager';
import { militaryHours } from '../data/dateTimeData';
import { colors, fontFamily } from '../styles/generalStyles';




export const DailySchedule = () => {

    const { activities, daySelected, dispatcher } = useContext(AppContext)
    const { setIsOpen, setModalType } = useContext(ModalsContext)
    const [ dayHourActivityStructure, setDayHourActivityStructure ] = useState<DayStructure[]>([])
    
    /* Building structure of the hour and activity */
    useEffect(() => {
        const structure = hourActivityStructure( [ daySelected ], activities )
        setDayHourActivityStructure( structure )
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
            { /* Each activity */ }
            {   dayHourActivityStructure.map(dh => {
                    return dh.activitiesOfDate.map((a, i) => <ActivityNote key={ i.toString() + a.id } view='D' activity={ a } />)
                    }
                )
            }

            { /* Each hour block */ }
            {   militaryHours.map((h, i) => (
                    <View 
                        key={ i + h }
                        style={ styles.calendarHourContainer } >
                        <View style={{ flex: 1}}>
                            <Text style={ styles.textHour }>{ `${ h < 10 ? '0'+h.toString() : h }:00 ${h > 12 ? 'pm' : 'am'}` }</Text>
                        </View>
                        <View style={{ flex: 2 }} >
                            <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:00`) } delayLongPress={ 500 }/>
                            <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:15`) } delayLongPress={ 500 }/>
                            <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:30`) } delayLongPress={ 500 }/>
                            <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${h < 10 ? '0'+h.toString() : h }:45`) } delayLongPress={ 500 }/>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    calendarHourContainer: {
        position: 'relative',
        zIndex: 0,
        elevation: 0,
        height: 100,
        borderBottomWidth: .5,
        borderBottomColor: colors.lightGrey,
        flexDirection: 'row',
    },
    textHour: {
        fontFamily: fontFamily.bold,
        color: colors.lightGrey,
        fontSize: 20,
        position: 'relative',
        top: 5,
        left: 10
    }
});
