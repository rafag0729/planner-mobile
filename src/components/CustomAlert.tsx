import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FailedIcon, SuccessIcon } from '../shared/assetsManager';
import { fontFamily } from '../styles/generalStyles';



interface Props {
    type: 'success' | 'failed'
}

export const CustomAlert = ({ type }: Props) => {

    if(type === 'success'){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <SuccessIcon />
                <Text style={ styles.alertText }>Operación exitosa!</Text>
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FailedIcon />
                <Text style={ styles.alertText }>Operación fallida</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    alertText: {
        fontSize: 28,
        fontFamily: fontFamily.regular,
        marginTop: 20
    }
});