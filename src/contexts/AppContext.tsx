import React from 'react';
import { createContext, useReducer } from 'react';
import { AppContextInterface } from '../interfaces/appInterfaces';
import { appReducer } from '../reducer/appReducer';




const initialValues: AppContextInterface = {
    daySelected: new Date(),
    dateTimeToModal: {
        dateM: '',
        startTimeM: '',
    },
    activities: [],
    activitySelected: null,
    view: 'D',
}

export const AppContext = createContext<AppContextInterface>( initialValues )

export const AppContextProvider = ({ children }: any ) => {

    const [contextInfo, dispatch] = useReducer(appReducer, initialValues)

    return (
        <AppContext.Provider value={{
            ...contextInfo,
            dispatcher: dispatch
        }}>
            { children }
        </AppContext.Provider>
    )
}