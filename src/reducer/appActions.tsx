import { AppActions, Activity } from '../interfaces/appInterfaces';




export const setDate = ( date: Date): AppActions => {
    return {
        type: 'Set date',
        payload: date
    }
}


export const loadDBActivities = ( activities: Activity[]): AppActions => {
    return {
        type: 'Load activities',
        payload: activities
    }
}


export const addNewActivity = ( activity: Activity): AppActions => {
    return {
        type: 'Add a new activity',
        payload: activity
    }
}