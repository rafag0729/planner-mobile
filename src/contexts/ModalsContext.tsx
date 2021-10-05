import React, { createContext, useState } from 'react';
import { ModalsInterface, ModalTypes } from '../interfaces/appInterfaces';



const initialValues: ModalsInterface = {
    open: false,
    type: null,
    setIsOpen: () => {},
    setModalType: () => {},
}


export const ModalsContext = createContext<ModalsInterface>(initialValues);

export const ModalsContextProvider = ({ children }: any) => {

    const [isOpen, setIsOpen] = useState(false)
    const [modalType, setModalType] = useState<ModalTypes>(null)

    return (
        <ModalsContext.Provider value={{
            open: isOpen,
            type: modalType,
            setIsOpen: (value: boolean) => setIsOpen(value),
            setModalType: (value: ModalTypes)  => setModalType(value)
        }} >
            { children }
        </ModalsContext.Provider>
    )
}
