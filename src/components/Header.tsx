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
                <LogoutIcon 
                    size={ 30 }
                    color={ colors.customRed }
                    />
            </View>
        </View>
    )
}

const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        textAlign: 'right'
    },
    mainText: {
        fontSize: 16,
        fontFamily: fontFamily.bold,
        color: colors.lightBlue,
        marginBottom: -5
    },
    subText: {
        fontSize: 12,
        fontFamily: fontFamily.regular,
        color: colors.lightGrey
    },
    iconContainer: {
        marginHorizontal: 5,
        height: '100%',
        width: 40,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});