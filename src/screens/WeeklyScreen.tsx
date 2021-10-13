import React from 'react';
import { View } from 'react-native';

import { ModalsContextProvider } from '../contexts/contextsManager';
import { WeekDateHeaders, DateNavigation, DailySchedule, CustomModal } from '../shared/componentsManager';



export const WeeklyScreen = () => {
    return (
        <ModalsContextProvider>
            <View style={{ flex: 1, padding: 5}}>
                <WeekDateHeaders />

                <DateNavigation />

                <DailySchedule/>            
                
                <CustomModal />
            </View>
        </ModalsContextProvider>
    )
}
