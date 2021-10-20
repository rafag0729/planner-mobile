import React from 'react';
import { View } from 'react-native';

import { MonthDateHeaders, DateNavigation, MonthlySchedule } from '../shared/componentsManager';



export const MonthlyScreen = () => {
    return (
        <View style={{ flex: 1, padding: 5}}>
            <MonthDateHeaders />

            <DateNavigation />

            <MonthlySchedule />
        </View>
    )
}
