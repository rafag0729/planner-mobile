import { AppActions, Activity, ActivityToSubmit } from '../interfaces/appInterfaces';
import { getDateFromDateObj } from '../helpers/dateHelpers';




export const setDate = ( date: Date): AppActions => {
    return {
        type: 'Set date',
        payload: getDateFromDateObj(date)
    }
}

export const setDateTimeToModal = ( date: string, startTime: string ): AppActions => {
    return {
        type: 'Add date-startTime  to Modal',
        payload: { date, startTime }
    }
}


export const loadDBActivities = ( activities: Activity[]): AppActions => {
    return {
        type: 'Load activities',
        payload: activities
    }
}


export const addNewActivity = ( activity: ActivityToSubmit): AppActions => {
    return {
        type: 'Add a new activity',
        payload: activity
    }
}