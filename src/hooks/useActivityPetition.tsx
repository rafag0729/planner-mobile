import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from "react"

import { Activity, ProjectInterface, RespType, ActivityToSubmit } from '../interfaces/appInterfaces';
import { addNewActivity, loadDBActivities, editActivity, deleteActivityGS, unsetActivity } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { useMoveModalAnimation } from "./hooksManager";
import { getMonthDays } from '../helpers/helpersManager';




export const useActivityPetition = () => {

    const { daySelected, dispatcher }  = useContext(AppContext);
    const { setIsOpen } = useContext(ModalsContext);
    const { modalPosition, moveToRight } = useMoveModalAnimation();
    const [respType, setRespType] = useState<RespType>('failed');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadResources();
    }, [])

    const loadResources = async() => {

        let projects: ProjectInterface[] = [];
        let projectTypes: ProjectInterface[] = [];

        try {
            const respProjects = await firestore().collection('projects').get();
            const respProjectTypes = await firestore().collection('projectTypes').get();
            
            respProjects.docs.forEach(d => {
                const { color, name } = d.data();
                projects.push({ id: d.id, name, color })
            })
            respProjectTypes.docs.forEach(d => {
                const { name } = d.data();
                projectTypes.push({ id: d.id, name })
            })
        } catch (error) {
            console.log('Error getting projectsInfo and projectTypes: ', error)
        }

        return { projects, projectTypes }
    }

    
    const loadActivities = async() => {
        setIsLoading(true);
        try {
            const { projects, projectTypes } = await loadResources(); 
            let activities: Activity[] = [];
            
            const [ firstDays, secondDays, thirdDays ] = getMonthDays(daySelected);
            const firstPromise = firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').where('day', 'in', firstDays ).get();
            const secondPromise = firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').where('day', 'in', secondDays ).get();
            const thirdPromise = firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').where('day', 'in', thirdDays ).get();
            let promises = await Promise.all( [firstPromise, secondPromise, thirdPromise] )
            promises.forEach(p => p.docs.forEach(d => {
                const { projectName, activityType, description, day, endTime, startTime } = d.data();
                activities.push({ 
                    projectName: projects.filter( p => p.id === projectName)[0],
                    activityType: projectTypes.filter( p => p.id === activityType)[0],
                    description, day, endTime, startTime, id: d.id })
            }))
            
            dispatcher( loadDBActivities( activities ) )
            setIsLoading(false)
            
        } catch (error) {
            console.log( 'Error loading activities or assets, ',error )
            setIsLoading(false)
        }
    }


    /* Function to choose either between a creation or upload petition */
    const submitActivity = (activity: ActivityToSubmit) => {
        !activity.id ? createActivity({ ...activity }) : updateActivity(activity, activity.id)
    }


    /* Function to save a new an activity in Firebase  */
    const createActivity = async(activity: ActivityToSubmit) => {
        moveToRight( 1 ) ;
        try {
            const { projects, projectTypes } = await loadResources()
            const resp = await firestore().collection('users/vC37t4OJ5DWQ7yPvf3RC/activities').add({...activity });
            let activityReducer = {
                ...activity,
                id: resp.id,
                projectName: projects.filter(p => p.id === activity.projectName )[0],
                activityType: projectTypes.filter(t => t.id === activity.activityType)[0]
            }
            
            dispatcher( addNewActivity( activityReducer ) );
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

    const updateActivity = async(activity: ActivityToSubmit, id: string) => {
        moveToRight( 1 ) ;
        try {
            const { projects, projectTypes } = await loadResources(); 
            await firestore().doc(`users/vC37t4OJ5DWQ7yPvf3RC/activities/${id}`).update(activity);
            let activityReducer = {
                ...activity,
                id: id,
                projectName: projects.filter(p => p.id === activity.projectName )[0],
                activityType: projectTypes.filter(t => t.id === activity.activityType)[0]
            }

            dispatcher( editActivity( activityReducer ) )
            setRespType('success');
            dispatcher( unsetActivity() )
            
            setTimeout(() => {
                moveToRight( 2 )
                setTimeout(() => {
                    setIsOpen( false )
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
            
        } catch (error) {
            console.log(error)
            setRespType('failed');
            dispatcher( unsetActivity() )

            setTimeout(() => {
                moveToRight( 2 )

                setTimeout(() => {
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
        }
    }

    const deleteActivity = async (id: string) => {
        moveToRight( 1 ) ;
        try {
            await firestore().doc(`users/vC37t4OJ5DWQ7yPvf3RC/activities/${id}`).delete()

            dispatcher( deleteActivityGS( id ) )
            setRespType('success');
            dispatcher( unsetActivity() )
            
            setTimeout(() => {
                moveToRight( 2 )
                setTimeout(() => {
                    setIsOpen( false )
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
            
        } catch (error) {
            console.log(error)
            setRespType('failed');
            dispatcher( unsetActivity() )

            setTimeout(() => {
                moveToRight( 2 )

                setTimeout(() => {
                    moveToRight( 0 )
                }, 1500)
            }, 1500)
        }
    }

    return {
        modalPosition,
        respType,
        isLoading,
        loadActivities,
        submitActivity,
        deleteActivity
    }

}
