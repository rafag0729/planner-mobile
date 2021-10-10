import { useRef } from "react";
import { Animated, Dimensions, Easing } from 'react-native';



const { width } = Dimensions.get('window')

export const useMoveModalAnimation = () => {

    const modalPosition = useRef( new Animated.Value(0) ).current;
    const alertPosition = useRef( new Animated.Value(-60) ).current;
    

    /* Function for moving a modal to the right */
    const moveToRight = (times: number) => {
        Animated.timing(
            modalPosition,
            {
                toValue: -width * times,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bounce
            }).start()
    }

    const moveDown = () => {
        Animated.timing(
            alertPosition,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bounce
            }
        ).start();
    }

    const moveTop = () => {
        Animated.timing(
            alertPosition,
            {
                toValue: -60,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.ease
            }
        ).start();
    }

    return {
        modalPosition,
        alertPosition,
        moveToRight,
        moveDown,
        moveTop
    }

}
