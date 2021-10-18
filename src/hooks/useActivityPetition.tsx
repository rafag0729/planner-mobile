import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useContext, useRef, useState } from "react"

import { Activity, ProjectInterface, RespType, ActivityToSubmit } from '../interfaces/appInterfaces';
import { addNewActivity, loadDBActivities } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { useMoveModalAnimation } from "./hooksManager";
import { dateFormatted, getDateFromDateObj, buildingWeek, getWorkDays } from '../helpers/helpersManager';




export const useActivityPetition = () => {

    const { daySelected, dispatcher }  = useContext(AppContext);
    const { setIsOpen } = useContext(ModalsContext);
    const { modalPosition, moveToRight } = useMoveModalAnimation();
    const projects = useRef<ProjectInterface[]>([]);;
    const projectTypes = useRef<ProjectInterface[]>([]);
    const [respType, setRespType] = useState<RespType>('failed');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    const loadActivities = async(view: 'day' | 'week' | 'month') => {
        setIsLoading(true);
        try {
            let activities: Activity[] = [];

            let respActivities;
            switch (view) {
                case 'day':
                    respActivities = await firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').where('day','==',dateFormatted(getDateFromDateObj(daySelected))).get();
                    respActivities.docs.forEach(d => {
                        const { projectName, activityType, description, day, endTime, startTime } = d.data()
                        activities.push({ 
                            projectName: projects.current.filter( p => p.id === projectName)[0],
                            activityType: projectTypes.current.filter( p => p.id === activityType)[0],
                            description, day, endTime, startTime, id: d.id })
                    })
                    break;

                case 'week':
                    let promises: Promise<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>>[] = [];
                    const daysOfWeek = getWorkDays( buildingWeek(daySelected) );
                    daysOfWeek.forEach((d) => {
                        promises.push(firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').where('day','==', dateFormatted(d)).get())
                    })
                    const resp = await Promise.all(promises);
                    resp.forEach(a => {
                        a.docs.forEach( d => {
                            const { projectName, activityType, description, day, endTime, startTime } = d.data()
                            activities.push({ 
                                projectName: projects.current.filter( p => p.id === projectName)[0],
                                activityType: projectTypes.current.filter( p => p.id === activityType)[0],
                                description, day, endTime, startTime, id: d.id })
                        })
                    })
                    break;

                case 'month':
                    respActivities = await firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').where('day','==', '11-10-2021' && '13-10-2021').get();
                    break;
            }
            const respProjects = await firestore().collection('projects').get();
            const respProjectTypes = await firestore().collection('projectTypes').get();

            respProjects.docs.forEach(d => {
                const { color, name } = d.data();
                projects.current.push({ id: d.id, name, color })
            })
            respProjectTypes.docs.forEach(d => {
                const { name } = d.data();
                projectTypes.current.push({ id: d.id, name })
            })
            

            dispatcher( loadDBActivities( activities ) )
            setIsLoading(false)
            
        } catch (error) {
            console.log( 'Error loading activities or assets, ',error )
            setIsLoading(false)
        }
    }


    /* Function to choose either between a creation or upload petition */
    const submitActivity = (activity: ActivityToSubmit) => {
        !activity.id ? createActivity({ ...activity }) : updateActivity(activity)
    }


    /* Function to save a new an activity in Firebase  */
    const createActivity = async(activity: ActivityToSubmit) => {
        moveToRight( 1 ) ;
        try {
            const resp = await firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').add({...activity });    
            dispatcher( addNewActivity({...activity, id: resp.id}) );
            setRespType('success');
            
            setTimeout(() => {
                moveToRight( 2 )
                setTimeout(() => {
                    setIsOpen( false );
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
            
        } catch (error) {
            console.log('Error creating the activity, ',error)
            setRespType('failed');

            setTimeout(() => {
                moveToRight( 2 )
                setTimeout(() => {
                    setIsOpen( false );
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
        }
    }

    const updateActivity = async(activity: ActivityToSubmit) => {
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
        isLoading,
        loadActivities,
        submitActivity,
    }

}
