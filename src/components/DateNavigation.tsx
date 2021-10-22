import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../contexts/contextsManager';
import { setDate } from '../reducer/appActions';
import { getDateFromDateObj, buildingWeek } from '../helpers/helpersManager';
import { CalendarIcon, NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';
 



interface Props {
    view: 'M' | 'W' | 'D'
}

export const DateNavigation = ( { view }: Props ) => {

    const { daySelected, dispatcher } = useContext(AppContext)
    const [ pickerStatus, setPickerStatus ] = useState<boolean>(false)    
    const [todayStatus, setTodayStatus] = useState<boolean>(false)

    useEffect(() => {
        checkingTodayEquality();
    }, [daySelected])


    const checkingTodayEquality = () => {
        const dateState = daySelected;
        const actualDate = new Date();
        const dateStateFormatted = new Date(dateState.getFullYear(), dateState.getMonth(), dateState.getDate()).getTime();
        const actualDateFormatted = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()).getTime();
        if(view === 'M') {
            (dateState.getMonth() === actualDate.getMonth() && dateState.getMonth() === actualDate.getMonth() ) ? setTodayStatus(true) : setTodayStatus(false);
        }else if( view === 'W'){
            const { weekObj } = buildingWeek(daySelected)
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
        let { day, monthNumber, year } = getDateFromDateObj( daySelected );
        operation === 'add' ? day++ : day--;
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
                    value={ daySelected }
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
