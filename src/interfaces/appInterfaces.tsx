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
    | { type: 'Add a new activity', payload: ActivityToSubmit }
    | { type: 'Update an activity', payload: ActivityToSubmit }
    | { type: 'Remove activity', payload: string }


// Dates
export type DateSpecs = {
    day: number;
    dayName: String;
    month: string;
    year: number;
}

// Hour Obj

export type TimeSpecs = {
    hour: number | string;
    minutes: number | string,
    seconds?: number | string;
    meridiem?: string;
}

// Activities

export interface Activity {
    id?: string | null;
    projectName: ProjectInterface;
    activityType: ProjectInterface;
    description: string;
    startTime: string;
    endTime: string;
    day: string;
}

export interface DayActivity {
    hour: number;
    activity: Activity[]
}

export interface ActivityToSubmit {
    id?: string | null;
    projectName: string;
    activityType: string;
    description: string;
    startTime: string;
    endTime: string;
    day: string;
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
    name: string;
    color?: string; 
}


// Modals
export interface ModalsInterface {
    open: boolean;
    type: ModalTypes;
    setIsOpen: (value: boolean) => void;
    setModalType: (value: ModalTypes) => void;
}

export type ModalTypes = 'create' | 'edit' | 'delete' | null;


/*  */
export type SubmitType = 'creation' | 'edition' | 'delete';

export type ModalType = 'creation' | 'edition' | '';

export type RespType = 'success' | 'failed';