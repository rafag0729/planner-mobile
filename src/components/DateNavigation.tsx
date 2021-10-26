import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ScreenView } from './../interfaces/appInterfaces'
import { AppContext } from '../contexts/contextsManager';
import { setDate } from '../reducer/appActions';
import { buildingWeek, dateSpectsToSystemDate } from '../helpers/helpersManager';
import { CalendarIcon, NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';
 



interface Props {
    view: ScreenView;
}

export const DateNavigation = ( { view }: Props ) => {

    const { daySelected, dispatcher } = useContext(AppContext)
    const [ pickerStatus, setPickerStatus ] = useState<boolean>(false)    
    const [todayStatus, setTodayStatus] = useState<boolean>(false)

    useEffect(() => {
        checkingTodayEquality();
    }, [daySelected])


    const checkingTodayEquality = () => {
        const { day, monthNumber, year } = daySelected;
        const actualDate = new Date();
        const dateStateFormatted = new Date(year, monthNumber, day).getTime();
        const actualDateFormatted = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()).getTime();
        if(view === 'M') {
            (monthNumber === actualDate.getMonth() && year === actualDate.getFullYear() ) ? setTodayStatus(true) : setTodayStatus(false);
        }else if( view === 'W'){
            const { weekObj } = buildingWeek( dateSpectsToSystemDate(daySelected) )
            if(weekObj.filter(d => d.day == actualDate.getDate() && d.monthNumber === actualDate.getMonth() && d.year === actualDate.getFullYear() ).length >= 1) {
                setTodayStatus(true)
            }else{
                setTodayStatus(false);
            }
        }else if( view === 'D'){
            ( dateStateFormatted === actualDateFormatted ) ? setTodayStatus(true) : setTodayStatus(false);
        }
    }

    /* Updating date based on picker */
    const handleDateChange = ( date: Date | undefined ) => {
        if(date){
            dispatcher( setDate( date ) );
        }
        setPickerStatus( false );
    }

    const handleDateChangeByArrow = (operation: 'add' | 'subtract') => {
        let { day, monthNumber, year } = daySelected;
        if(view === 'D'){
            operation === 'add' ? day++ : day--;
        }
        if(view === 'W'){
            operation === 'add' ? day = day + 8 : day = day - 8;
        }
        if(view === 'M'){
            operation === 'add' ? monthNumber++ : monthNumber--;
        }
        const date = new Date(year, monthNumber, day);
        dispatcher( setDate( date ) )
    }
    
    return (
        <>
            <View style={ styles.dateNavigation }>
                <TouchableOpacity
                    onPress={ () => setPickerStatus( true ) }
                    >
                    <CalendarIcon size={ 35 } />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={ styles.dateNavigationItems } 
                        onPress={ () => handleDateChangeByArrow('subtract') }
                        >
                        <NavigationArrow 
                            direction='left'
                            />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ 
                            ...styles.todayContainer,
                            backgroundColor: todayStatus ? colors.lightBlue : 'transparent'
                        }}
                        onPress={ () => handleDateChange(new Date()) }
                        >
                        <Text style={{ ...styles.textDateNavigation, color: todayStatus ? 'white' : colors.lightBlue }}>Hoy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.dateNavigationItems } 
                        onPress={ () => handleDateChangeByArrow('add') }
                        >
                        <NavigationArrow 
                            direction='rigth'
                            />
                    </TouchableOpacity>
                </View>
            </View>

            {   pickerStatus && (
                <DateTimePicker
                    value={ dateSpectsToSystemDate(daySelected) }
                    /* mode={mode}
                    is24Hour={true}
                    display="default" */
                    onChange={ (data: AndroidEvent, date: Date | undefined ) => { handleDateChange( date ) } }
                />
              )
            }
        </>
    )
}

const styles = StyleSheet.create({
    dateNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateNavigationItems: {
        marginHorizontal: 3
    },
    textDateNavigation: {
        fontFamily: fontFamily.regular,
        color: colors.primaryBlue,
        fontSize: 17,
        textAlign: 'center'
    },
    todayContainer: {
        justifyContent: 'center',
        marginHorizontal: 3,
        width: 50,
        borderRadius: 5
    }
});
