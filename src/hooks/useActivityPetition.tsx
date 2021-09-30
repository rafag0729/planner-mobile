import firestore from '@react-native-firebase/firestore';
import { useState } from "react"

import { Activity, RespType, SubmitType } from '../interfaces/appInterfaces';
import { useMoveModalAnimation } from "./hooksManager";


export const useActivityPetition = <T extends Function>( setShowModal: T ) => {

    const { modalPosition, moveToRight } = useMoveModalAnimation()
    
    const [respType, setRespType] = useState<RespType>('failed')

    const submitActivity = (activity: Activity) => {

        if(!activity.id){
            createActivity(activity);
        } else {
            updateActivity(activity);
        }
    }

    const createActivity = async(activity: Activity) => {
        moveToRight( 1 ) ;

        try {
            const resp = await firestore().collection('users/fechas/actividades').add({
                hola: 'saludo'
            });    
            setRespType('success');
            
            setTimeout(() => {
                moveToRight( 2 )

                setTimeout(() => {
                    setShowModal( false )
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
            
        } catch (error) {
            console.log(error)
            setRespType('failed');

            setTimeout(() => {
                moveToRight( 2 )

                setTimeout(() => {
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
        }
    }

    const updateActivity = async(activity: Activity) => {
        moveToRight( 1 ) ;

        /* try {
            const resp = await firestore().collection('users/fechas/actividades').add({
                hola: 'saludo'
            });    
            setRespType('success');
            
            setTimeout(() => {
                moveToRight( 2 )

                setTimeout(() => {
                    setShowModal( false )
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
            
        } catch (error) {
            console.log(error)
            setRespType('failed');

            setTimeout(() => {
                moveToRight( 2 )

                setTimeout(() => {
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
        } */
    }

    const deleteActivity = () => {
        console.log('Petition delete')
    }

    return {
        modalPosition,
        respType,
        submitActivity
    }

}
