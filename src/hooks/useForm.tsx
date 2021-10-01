import { useState } from "react";
import { getHourFromDateObj } from '../helpers/timeHelpers';




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
            const { hour, minutes, meridiem } = getHourFromDateObj( time );
            handleInputChange(`${hour}:${minutes} ${meridiem}`, timerTitle);
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
