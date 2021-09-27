import { AppActions } from "../interfaces/appInterfaces"




export const setDate = ( date: Date): AppActions => {
    return {
        type: 'Set date',
        payload: date
    }
}