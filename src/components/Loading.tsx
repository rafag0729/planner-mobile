import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../styles/generalStyles';




export const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator 
                size={ 60 }
                color={ colors.lightBlue }
                />

            <Text style={ styles.loadingText }>Cargando actividades...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        fontFamily: fontFamily.light,
        marginTop: 20
    }
});
