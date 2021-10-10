import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../contexts/contextsManager';
import { setDate } from '../reducer/appActions';
import { CalendarIcon, NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';
import { getDateFromDateObj } from '../helpers/dateHelpers';




export const DateNavigation = () => {

    const { daySelected, dispatcher } = useContext(AppContext)
    const [ pickerStatus, setPickerStatus ] = useState<boolean>(false)    


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
            <View style={ dateNavigatioStyles.dateNavigation }>
                <TouchableOpacity
                    onPress={ () => setPickerStatus( true ) }
                    >
                    <CalendarIcon size={ 35 } />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={ () => handleDateChangeByArrow('subtract') }
                        >
                        <NavigationArrow 
                            direction='left'
                            style={ dateNavigatioStyles.dateNavigationItems } />
                    </TouchableOpacity>
                    <Text style={{ ...dateNavigatioStyles.dateNavigationItems, ...dateNavigatioStyles.textDateNavigation }}>Hoy</Text>
                    <TouchableOpacity
                        onPress={ () => handleDateChangeByArrow('add') }
                        >
                        <NavigationArrow 
                            direction='rigth'
                            style={ dateNavigatioStyles.dateNavigationItems } />
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

const dateNavigatioStyles = StyleSheet.create({
    dateNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateNavigationItems: {
        marginHorizontal: 7
    },
    textDateNavigation: {
        fontFamily: fontFamily.regular,
        color: colors.primaryBlue,
        fontSize: 17
    },
});
