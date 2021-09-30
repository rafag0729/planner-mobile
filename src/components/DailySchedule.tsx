import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { militaryHours } from '../data/dateTimeData';
import { colors, fontFamily } from '../styles/generalStyles';



interface Props {
    setShowModal: ( value: boolean ) => void;
}

export const DailySchedule = ({ setShowModal }: Props) => {

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
                militaryHours.map((hour, i) => (
                    <View 
                        key={ i.toString() }
                        style={ styles.calendarHourContainer } >
                        <View style={{ flex: 1}}>
                            <Text style={ styles.textHour }>{ `${ hour }:00 ${hour > 12 ? 'pm' : 'am' }` }</Text>
                        </View>
                        <View style={{ flex: 2}} >
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            <TouchableOpacity style={{ flex: 1 }} onPress={ showingModal }/>
                            {/* <Activity /> */}
                        </View>
                    </View>
                    )) 
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    calendarHourContainer: {
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