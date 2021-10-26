import React from 'react';
import { createContext, useReducer } from 'react';

import { AppContextInterface } from '../interfaces/appInterfaces';
import { appReducer } from '../reducer/appReducer';
import { getDateFromDateObj } from '../helpers/helpersManager';




const initialValues: AppContextInterface = {
    daySelected: getDateFromDateObj(new Date()) ,
    dateTimeToModal: {
        dateM: '--:-- am/pm',
        startTimeM: '--:-- am/pm',
    },
    activities: [],
    activitySelected: null,
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