import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { buildingCalendar } from '../helpers/buildingCalendar';
import { NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';



export const DailyScreen = () => {

    buildingCalendar();
    return (
        <View style={{ flex: 1, padding: 5}}>

            {/* Text Header */}
            <Text style={ styles.mainTextHead }>SEPTIEMBRE 2021</Text>
            <Text style={ styles.subTextHead }>Viernes 2</Text>


            {/* Date Navigation */}
            <View style={ styles.dateNavigation }>
                <NavigationArrow 
                    direction='left'
                    style={ styles.dateNavigationItems } />
                <Text style={{ ...styles.dateNavigationItems, ...styles.textDateNavigation }}>Hoy</Text>
                <NavigationArrow 
                    direction='rigth'
                    style={ styles.dateNavigationItems } />
            </View>

            
            <Text>Calendar</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    mainTextHead: {
        fontSize: 36,
        color: colors.darkBlue,
        fontFamily: fontFamily.bold,
        marginTop: 10
    },
    subTextHead: {
        marginTop: -20,
        fontSize: 28,
        fontFamily: fontFamily.bold,
        color: colors.primaryBlue
    },
    dateNavigation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    dateNavigationItems: {
        marginHorizontal: 7
    },
    textDateNavigation: {
        fontFamily: fontFamily.regular,
        color: colors.primaryBlue,
        fontSize: 17
    }
});