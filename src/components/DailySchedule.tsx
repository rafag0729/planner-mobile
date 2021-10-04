import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ActivityNote } from './../shared/componentsManager';
import { AppContext } from '../context/AppContext';
import { useActivityPetition } from '../hooks/useActivityPetition';
import { hourActivityStructure } from '../helpers/helpersManager';
import { militaryHours } from '../data/dateTimeData';
import { colors, fontFamily } from '../styles/generalStyles';
import { DayActivity } from '../interfaces/appInterfaces';



interface Props {
    setShowModal: ( value: boolean ) => void;
}

export const DailySchedule = ({ setShowModal }: Props) => {

    const { activities } = useContext(AppContext)
    const { loadActivities } = useActivityPetition(() => {} )

    const [activityPerHour, setActivityPerHour] = useState<DayActivity[]>([])
    
    useEffect(() => {
        loadActivities();
    }, [])

    /* Building structure of the hour and activity */
    useEffect(() => {
        const structure = hourActivityStructure( militaryHours, activities )
        setActivityPerHour( structure )
    }, [activities])

    
    const showingModal = () => {
        setShowModal( true )
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
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>

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