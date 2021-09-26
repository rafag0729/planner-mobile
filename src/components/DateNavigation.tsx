import DatePicker from 'react-native-date-picker'
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarIcon, NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';





export const DateNavigation = () => {

    const [date, setDate] = useState<Date>( new Date() )
    const [pickerStatus, setPickerStatus] = useState<boolean>(false)

    useEffect(() => {
        console.log('new date: ', date)
    }, [date])

    return (
        <>
            <View style={ dateNavigatioStyles.dateNavigation }>
                <TouchableOpacity
                    onPress={ () => setPickerStatus( true ) }
                    >
                    <CalendarIcon />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <NavigationArrow 
                        direction='left'
                        style={ dateNavigatioStyles.dateNavigationItems } />
                    <Text style={{ ...dateNavigatioStyles.dateNavigationItems, ...dateNavigatioStyles.textDateNavigation }}>Hoy</Text>
                    <NavigationArrow 
                        direction='rigth'
                        style={ dateNavigatioStyles.dateNavigationItems } />
                </View>
            </View>

            <DatePicker
                mode="date"
                title="Seleccionar una fecha"
                cancelText="Cancelar"
                confirmText="Seleccionar"
                fadeToColor="blue"
                locale="es-CO"
                modal
                open={ pickerStatus }
                date={ date }
                onConfirm={ ( value: Date ) => {
                    setDate( value )
                    setPickerStatus( false )
                 }}
                onCancel={() => () => setPickerStatus( false ) }
                onDateChange={ console.log }
            />
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
