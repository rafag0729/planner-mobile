import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../context/AppContext';
import { setDate } from '../reducer/appActions';
import { CalendarIcon, NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';





export const DateNavigation = () => {

    const { daySelected, dispatcher } = useContext(AppContext)
    const [ pickerStatus, setPickerStatus ] = useState<boolean>(false)    

    /* Updating date based on picker */
    const handleDateChange = ( date: any ) => {

        if(date){
            dispatcher( setDate( date ) );
        }
        setPickerStatus( false );
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
                        onPress={ () => setPickerStatus( false )}
                        >
                        <NavigationArrow 
                            direction='left'
                            style={ dateNavigatioStyles.dateNavigationItems } />
                    </TouchableOpacity>
                    <Text style={{ ...dateNavigatioStyles.dateNavigationItems, ...dateNavigatioStyles.textDateNavigation }}>Hoy</Text>
                    <NavigationArrow 
                        direction='rigth'
                        style={ dateNavigatioStyles.dateNavigationItems } />
                </View>
            </View>

            {   pickerStatus && (
                <DateTimePicker
                    value={ daySelected }
                    /* mode={mode}
                    is24Hour={true}
                    display="default" */
                    onChange={ ( e: any, date: any ) => handleDateChange(date) }
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
