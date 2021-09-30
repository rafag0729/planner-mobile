import firestore from '@react-native-firebase/firestore';
import { useState } from "react"

import { Activity } from '../interfaces/appInterfaces';
import { useMoveModalAnimation } from "./hooksManager";




export const useActivityPetition = () => {

    const { modalPosition, moveToRight } = useMoveModalAnimation()
    
    const [isLoading, setIsLoading] = useState(false);

    const createActivity = async( activity : Activity) => {
        setIsLoading( true );
        moveToRight( 1 ) ;

        try {
            const resp = await firestore().collection('users/fechas/actividades').add({})    
            console.log( resp );
        } catch (error) {
            console.log(error)
        }
        
        

        
    }

    const updateActivity = () => {
        console.log('Petition update')
    }

    const deleteActivity = () => {
        console.log('Petition delete')
    }

    return {
        modalPosition,
        createActivity
    }

}
