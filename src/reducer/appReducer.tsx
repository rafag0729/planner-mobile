import { AppActions, AppContextInterface } from '../interfaces/appInterfaces';



export const appReducer = ( state: AppContextInterface, action: AppActions ): AppContextInterface => {

    switch (action.type) {
        case 'Set date':
            return {
                ...state,
                daySelected: action.payload
            }
        
        case 'Select activity':
            return {
                ...state,
                activitySelected: action.payload
            }

        case 'Unset selected activity':
            return {
                ...state,
                activitySelected: null
            }

        case 'Add date-startTime to Modal':
            return {
                ...state,
                dateTimeToModal: {
                    ...state.dateTimeToModal,
                    dateM: action.payload.date,
                    startTimeM: action.payload.startTime
                }
            }

        case 'Load activities':
            return {
                ...state,
                activities: action.payload
            }
        
        case 'Add a new activity':
            return {
                ...state,
                activities: [
                    ...state.activities,
                    action.payload
                ]
            }
            
        case 'Update an activity':
            return {
                ...state,
                activities: state.activities.map(sa => sa.id === action.payload.id ? action.payload : sa )
            }

        case 'Remove activity': 
            return {
                ...state,
                activities: state.activities.filter(a => a.id !== action.payload )
            }    

        default:
            return state;
    }
}