import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LogoutIcon } from '../shared/assetsManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const Header = () => {
    return (
        <View style={ headerStyles.container }>
            <View>
                <Text style={[ headerStyles.text, headerStyles.mainText ]}>Rafael Gallego Aristizabal</Text>
                <Text style={[ headerStyles.text, headerStyles.subText ]}>Administrador</Text>
            </View>
            <View style={ headerStyles.iconContainer }>
                {/* <LogoutIcon /> */}
            </View>
        </View>
    )
}

const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'right'
    },
    mainText: {
        fontSize: 16,
        fontFamily: fontFamily.bold,
        /* color: colors.lightBlue, */
        color: '#e92727',
        marginBottom: -5
    },
    subText: {
        fontSize: 14,
        fontFamily: fontFamily.bold,
        color: colors.lightGrey
    },
    iconContainer: {
        marginLeft: 5
    }
});