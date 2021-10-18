import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DayStructure } from '../interfaces/appInterfaces';
import { setDateTimeToModal } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { ActivityNote, Loading } from './../shared/componentsManager';
import { useActivityPetition } from '../hooks/hooksManager';
import { hourActivityStructure, dateFormatted, getDateFromDateObj} from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const DailySchedule = () => {

    const { activities, daySelected, dispatcher } = useContext(AppContext)
    const { setIsOpen, setModalType } = useContext(ModalsContext)
    const { isLoading, loadActivities } = useActivityPetition()
    const [ dayHourActivityStructure, setDayHourActivityStructure ] = useState<DayStructure[]>([])
    
    useEffect(() => {
        loadActivities('day')
    }, [daySelected])
    
    
    /* Building structure of the hour and activity */
    useEffect(() => {
        const structure = hourActivityStructure( [ getDateFromDateObj(daySelected) ], activities )
        setDayHourActivityStructure( structure )
    }, [activities])

    
    const showCreateModal = (date: Date, time: string) => {
        const dateM = dateFormatted( getDateFromDateObj(date) )
        dispatcher(setDateTimeToModal( dateM, time))
        setModalType('create');
        setIsOpen(true);
    }

    if(isLoading){
        return <Loading />
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
                                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:00`) }/>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:15`) }/>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:30`) }/>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:45`) }/>
        
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