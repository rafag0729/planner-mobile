import { useState } from "react";
import { getHourFromDateObj, timeFormatted } from "../helpers/helpersManager";





export const useForm = <T extends Object>( form: T ) => {

    const [formValues, setFormValues] = useState( form );

    const handleInputChange = (value: string, field: keyof T) => {
        setFormValues({
            ...formValues,
            [field]: value
        })
    }

    const settingHour = ( time: Date | undefined, timerTitle: keyof T ) => { 
        if(time){
            handleInputChange( timeFormatted( getHourFromDateObj( time ), false ), timerTitle );
        }
    }

    const resetForm = () => {
        setFormValues({
            ...form
        })
    }

    return {
        ...formValues,
        formValues,
        setFormValues,
        resetForm,
        handleInputChange,
        settingHour
    }
}
