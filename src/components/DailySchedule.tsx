import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DayStructure, DateSpecs } from '../interfaces/appInterfaces';
import { setDateTimeToModal } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { ActivityNote } from './../shared/componentsManager';
import { hourActivityStructure, dateFormatted } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const DailySchedule = () => {

    const { activities, daySelected, dispatcher } = useContext(AppContext)
    const { setIsOpen, setModalType } = useContext(ModalsContext)
    const [ dayHourActivityStructure, setDayHourActivityStructure ] = useState<DayStructure[]>([])
    
    /* Building structure of the hour and activity */
    useEffect(() => {
        const structure = hourActivityStructure( [ daySelected ], activities )
        setDayHourActivityStructure( structure )
    }, [activities])

    
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
            
            { /* Each hour block */
                dayHourActivityStructure.map((dha) => {
                    return dha.dayHourStructure.map(({hour, activity}, i) => (
                        (
                            <View 
                                key={ i.toString() }
                                style={ styles.calendarHourContainer } >
                                <View style={{ flex: 1}}>
                                    <Text style={ styles.textHour }>{ `${ hour }:00 ${hour > 12 ? 'pm' : 'am' }` }</Text>
                                </View>
                                <View style={{ flex: 2 }} >
                                    <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:00`) } delayLongPress={ 500 }/>
                                    <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:15`) } delayLongPress={ 500 }/>
                                    <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:30`) } delayLongPress={ 500 }/>
                                    <TouchableOpacity style={{ flex: 1 }} onLongPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:45`) } delayLongPress={ 500 }/>
        
                                    {   activity.map(a => (
                                            <ActivityNote 
                                                key={ a.id }
                                                activity={ a }
                                                />  
                                        ))
                                    }
                                </View>
                            </View>
                        )))
                })
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