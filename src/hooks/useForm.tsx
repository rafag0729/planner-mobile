import { useState } from "react"


export const useForm = <T extends Object>( form: T ) => {

    const [formValues, setFormValues] = useState( form );

    const handleInputChange = (value: string, field: keyof T) => {
        setFormValues({
            ...formValues,
            [field]: value
        })
    }

    return {
        ...formValues,
        handleInputChange
    }
}
