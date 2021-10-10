import { AppActions, AppContextInterface } from '../interfaces/appInterfaces';



export const appReducer = ( state: AppContextInterface, action: AppActions ): AppContextInterface => {

    switch (action.type) {
        case 'Set date':
            return {
                ...state,
                daySelected: action.payload
            }

        case 'Load activities':
            return {
                ...state,
                activities: action.payload
            }
        
        /* case 'Add a new activity':
            return {
                ...state,
                activities: [
                    ...state.activities,
                    action.payload
                ]
            } */
            
    
        default:
            return state;

        
    }
}


/* What actions do I need 

    daySelected: new Date(),
- setDate payload( date )

    activities: []
- loadActivities() en la primera carga
- addActivity
- updateActivity
- removeActivity

*/