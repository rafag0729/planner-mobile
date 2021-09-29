import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../styles/generalStyles';




export const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator 
                size={ 60 }
                color={ colors.lightBlue }
                />
        </View>
    )
}
