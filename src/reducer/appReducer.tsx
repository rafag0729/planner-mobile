import { AppActions, AppContextInterface } from '../interfaces/appInterfaces';



export const appReducer = ( state: AppContextInterface, action: AppActions ): AppContextInterface => {

    switch (action.type) {
        case 'Set date':
            return {
                ...state,
                daySelected: action.payload
            }
            
    
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