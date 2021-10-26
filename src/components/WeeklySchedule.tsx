import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DateSpecs, DayStructure } from '../interfaces/appInterfaces';
import { setDateTimeToModal } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { ActivityNote } from '../shared/componentsManager';
import { hourActivityStructure, dateFormatted, dateSpectsToSystemDate, buildingWeek, getWorkDays } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const WeeklySchedule = () => {

    const { activities, daySelected, dispatcher } = useContext(AppContext)
    const { setIsOpen, setModalType } = useContext(ModalsContext)
    const [ dayHourActivityStructure, setDayHourActivityStructure ] = useState<DayStructure[]>([])

    useEffect(() => {
        const { weekObj } = getWorkDays( buildingWeek( dateSpectsToSystemDate(daySelected)) );
        const structure = hourActivityStructure( weekObj , activities )
        setDayHourActivityStructure( structure )
    }, [daySelected])
    

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
                {   dayHourActivityStructure.map(({date, dayHourStructure}, i) => (
                        <View
                            key={ i.toString() }
                            >
                            <View style={ styles.dayHeaderContainer } >
                                <Text style={ styles.dayHeaderText }>{ `${date.dayName} - ${date.day}` }</Text>
                            </View>

                            {   dayHourStructure.map(({hour, activity}, i) => (
                                    <View 
                                        key={ i.toString() } 
                                        style={ styles.calendarHourContainer}
                                        >
                                        <View style={{ flex: 2 }} >
                                        <Text style={ styles.textHour }>{ `${ hour }:00 ${hour > 12 ? 'pm' : 'am' }` }</Text>
                                            <TouchableOpacity style={{ flex: 1}} onPress={ () => showCreateModal(daySelected, `${hour < 10 ? '0'+hour.toString() : hour }:00`) }/>
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
        fontSize: 16,
        position: 'absolute',
        top: 5,
        left: 10
    }
});