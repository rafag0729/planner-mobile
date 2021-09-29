import React, { useState } from 'react';
import { View } from 'react-native';

import { DateHeaders, DateNavigation, DailySchedule, CustomModal } from '../shared/componentsManager';




export const DailyScreen = () => {

    const [showModal, setShowModal] = useState(true)

    return (
        <View style={{ flex: 1, padding: 5}}>
            <DateHeaders />

            <DateNavigation />

            <DailySchedule />            
            
            <CustomModal
                visible={ showModal }
                setShowModal={ ( value: boolean ) => setShowModal( value ) }
                />
        </View>
    )
}