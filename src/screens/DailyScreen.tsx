import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { buildingCalendar } from '../helpers/buildingCalendar';
import { NavigationArrow } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';



export const DailyScreen = () => {

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

            {/* Calendar */}
            <ScrollView
                style={{ marginTop: 20 }}
                showsVerticalScrollIndicator={ false }
                >
                
                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View style={{ backgroundColor: 'red', flex: 1}}>
                        <Text style={ styles.textHour }>7:00am</Text>
                    </View>
                    <View 
                        style={{ backgroundColor: 'green', flex: 2}}
                        />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>8:00am</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>9:00am</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>10:00am</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>11:00am</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>12:00pm</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>1:00pm</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>2:00pm</Text>
                    </View>
                    <View />
                </View>

                {/* Each hour block */}
                <View style={ styles.calendarHourContainer } >
                    <View>
                        <Text style={ styles.textHour }>3:00pm</Text>
                    </View>
                    <View />
                </View>

            </ScrollView>

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
    },

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