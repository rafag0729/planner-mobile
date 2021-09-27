// AppContext

export interface AppContextInterface {
    daySelected: Date;
    user?: User;
    activities: Activity[];
    dispatcher?: any
}

export type AppActions = 
    | { type: 'Set date', payload: Date }
    | { type: 'Load activities' }
    | { type: 'Add a new activity', payload: Activity }
    | { type: 'Update an activity', payload: Activity }
    | { type: 'Remove activity', payload: string }

// Activities

export interface Activity {
    project: string;
    activityType: string,
    description: string,
    initialTime: Date;
    finishTime: Date;
    color: string;
}


// User

export interface User {
    userName: string;
    id: string,
    authenticated: boolean;
}