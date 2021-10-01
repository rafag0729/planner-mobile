// AppContext

export interface AppContextInterface {
    daySelected: Date;
    activities: Activity[];
    activitySelected: Activity | null;
    user?: User;
    dispatcher?: any
}

export type AppActions = 
    | { type: 'Set date', payload: Date }
    | { type: 'Set initial hour', payload: string }
    | { type: 'Load activities', payload: Activity[] }
    | { type: 'Add a new activity', payload: Activity }
    | { type: 'Update an activity', payload: Activity }
    | { type: 'Remove activity', payload: string }


// Dates
export type DateSpecs = {
    day: number;
    dayName: String;
    month: string;
    year: number;
}

// Activities

export interface Activity {
    id?: string | null;
    projectName: string;
    activityType: string;
    description: string;
    startTime: string;
    endTime: string;
    day: string;
}

export interface DayActivity {
    hour: number;
    activity: Activity[]
}


// User

export interface User {
    userName: string;
    id: string,
    authenticated: boolean;
}

// ProjectName and ProjectType

export interface ProjectInterface {
    id: string;
    name: string
    color?: string; 
}


/*  */
export type SubmitType = 'creation' | 'edition' | 'delete';

export type ModalType = 'creation' | 'edition' | '';

export type RespType = 'success' | 'failed';