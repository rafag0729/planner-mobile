import firestore from '@react-native-firebase/firestore';
import { useContext, useState } from "react"

import { Activity, RespType} from '../interfaces/appInterfaces';
import { useMoveModalAnimation } from "./hooksManager";
import { AppContext } from '../context/AppContext';
import { addNewActivity, loadDBActivities } from '../reducer/appActions';


export const useActivityPetition = <T extends Function>( setShowModal: T ) => {

    /* Dispatcher of reducer state */
    const { dispatcher }  = useContext(AppContext)

    const { modalPosition, moveToRight } = useMoveModalAnimation()
    
    const [respType, setRespType] = useState<RespType>('failed')


    /* Function to choose either between a creation or upload petition */
    const submitActivity = (activity: Activity) => {

        if(!activity.id){
            createActivity(activity);
        } else {
            updateActivity(activity);
        }
    }

    /* Loading activities on any refresh */
    const loadActivities = async() => {

        try {
            let activities: Activity[] = [];

            const resp = await firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').get();
            resp.docs.forEach( (d) => {
                const { projectName, activityType, description, day, endTime, startTime } = d.data()
                activities.push({ projectName, activityType, description, day, endTime, startTime, id: d.id })
            })

            dispatcher( loadDBActivities( activities ) )
        } catch (error) {
            console.log( error )
        }
    }



    /* Function to create an activity */
    const createActivity = async(activity: Activity) => {
        moveToRight( 1 ) ;

        try {
            const resp = await firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').add({...activity });    
            dispatcher( addNewActivity({...activity, id: resp.id}) )

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
                    setShowModal( false )
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
        submitActivity,
        loadActivities
    }

}
