import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DayActivity } from '../interfaces/appInterfaces';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { ActivityNote } from './../shared/componentsManager';
import { useActivityPetition } from '../hooks/hooksManager';
import { hourActivityStructure } from '../helpers/helpersManager';
import { militaryHours } from '../data/dateTimeData';
import { colors, fontFamily } from '../styles/generalStyles';




export const DailySchedule = () => {

    const { activities } = useContext(AppContext)
    const { setIsOpen, setModalType } = useContext(ModalsContext)
    const { loadActivities } = useActivityPetition()

    const [activityPerHour, setActivityPerHour] = useState<DayActivity[]>([])
    
    useEffect(() => {
        loadActivities();
    }, [])

    /* Building structure of the hour and activity */
    useEffect(() => {
        const structure = hourActivityStructure( militaryHours, activities )
        setActivityPerHour( structure )
    }, [activities])

    
    const showCreateModal = () => {
        setModalType('create');
        setIsOpen(true);
    }

    return (
        <ScrollView
            style={{ marginTop: 25 }}
            showsVerticalScrollIndicator={ false }
            >
            
            {/* Each hour block */}
            {   
                activityPerHour.map(({ hour, activity }, i) => (
                    <View 
                        key={ i.toString() }
                        style={ styles.calendarHourContainer } >
                        <View style={{ flex: 1}}>
                            <Text style={ styles.textHour }>{ `${ hour }:00 ${hour > 12 ? 'pm' : 'am' }` }</Text>
                        </View>
                        <View style={{ flex: 2 }} >
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showCreateModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showCreateModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showCreateModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showCreateModal }/>

                            {   activity.map(a => (
                                    <ActivityNote 
                                        key={ a.id }
                                        activity={ a }
                                        />  
                                ))
                            }
                            
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