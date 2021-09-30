import React, { useState } from 'react';
import { View } from 'react-native';

import { DateHeaders, DateNavigation, DailySchedule, CustomModal } from '../shared/componentsManager';
import { ModalType } from '../interfaces/appInterfaces';




export const DailyScreen = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('');
    
    return (
        <View style={{ flex: 1, padding: 5}}>
            <DateHeaders />

            <DateNavigation />

            <DailySchedule 
                setShowModal={(value: boolean) => setShowModal(value) }
                />            
            
            <CustomModal
                type={ modalType }
                visible={ showModal }
                setShowModal={(value: boolean) => setShowModal(value) }
                />
        </View>
    )
}