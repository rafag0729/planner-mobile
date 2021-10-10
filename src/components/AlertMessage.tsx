import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

import { AlertMsgInterface } from '../interfaces/appInterfaces';
import { useMoveModalAnimation } from '../hooks/hooksManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const AlertMessage = ({ type, message, setAlertMsg }: AlertMsgInterface) => {

    const { alertPosition, moveDown, moveTop } = useMoveModalAnimation()

    // Animation when mounted
    useEffect(() => {
        moveDown();
    }, [])

    // Animation when unmounted
    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if(setAlertMsg){
            timerId = setTimeout(() => {
                    moveTop();
                    setTimeout(() => {
                        setAlertMsg({
                            open: false,
                            type: null,
                            message: ''
                        })
                    }, 500);
                }, 4000);
        }
        return () => clearTimeout(timerId)
    }, [])


    return (
        <Animated.View
            style={{ 
                ...styles.container,
                backgroundColor: type === 'success' ? colors.customGreen : colors.customRed,
                transform: [{
                    translateY: alertPosition
                }]
            }}
            >
            <Text style={ styles.text } >{ message }</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        padding: 10,
        minHeight: 50,
        zIndex: 999
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontFamily: fontFamily.regular,
        fontSize: 16,
        marginTop: 4
    }
});
