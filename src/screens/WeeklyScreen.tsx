import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppContext, ModalsContextProvider  } from '../contexts/contextsManager';
import { buildingWeek, getDateFromDateObj } from '../helpers/helpersManager';
import { DateSpecs } from '../interfaces/appInterfaces';
import { WeekDateHeaders, DateNavigation, WeeklySchedule, CustomModal } from '../shared/componentsManager';





export const WeeklyScreen = () => {
    return (
        <ModalsContextProvider>
            <View style={{ flex: 1, padding: 5}}>
                <WeekDateHeaders />

                <DateNavigation />

                <WeeklySchedule />
                
                <CustomModal />
            </View>
        </ModalsContextProvider>
    )
}
