import React from 'react';
import { View } from 'react-native';

import { DateHeaders, DateNavigation, DailySchedule, CustomModal } from '../shared/componentsManager';




export const DailyScreen = () => {

    return (
        <View style={{ flex: 1, padding: 5}}>
            <DateHeaders />

            <DateNavigation />

            <DailySchedule />            
            
            <CustomModal />
        </View>
    )
}