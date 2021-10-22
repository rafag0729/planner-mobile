import React from 'react';
import { View } from 'react-native';

import { ModalsContextProvider } from '../contexts/contextsManager';
import { DateHeaders, DateNavigation, DailySchedule, CustomModal } from '../shared/componentsManager';




export const DailyScreen = () => {
    return (
        <ModalsContextProvider>
            <View style={{ flex: 1, padding: 5}}>
                <DateHeaders />

                <DateNavigation view="D" />

                <DailySchedule/>            
                
                <CustomModal />
            </View>
        </ModalsContextProvider>
    )
}