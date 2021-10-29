import { AppActions, Activity } from '../interfaces/appInterfaces';
import { getDateFromDateObj } from '../helpers/dateHelpers';




export const setDate = ( date: Date): AppActions => {
    return {
        type: 'Set date',
        payload: getDateFromDateObj(date)
    }
}


export const selectActivity = (activity: Activity): AppActions => {
    return {
        type: 'Select activity',
        payload: activity
    }
}


export const unsetActivity = (): AppActions => {
    return {
        type: 'Unset selected activity'
    }
}


export const setDateTimeToModal = ( date: string, startTime: string ): AppActions => {
    return {
        type: 'Add date-startTime to Modal',
        payload: { date, startTime }
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

export const editActivity = (activity: Activity): AppActions => {
    return {
        type: 'Update an activity',
        payload: activity
    }
}

export const deleteActivityGS = (id: string): AppActions => {
    return {
        type: 'Remove activity',
        payload: id
    }
}