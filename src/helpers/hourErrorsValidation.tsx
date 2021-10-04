import { getHourFromString } from "./timeHelpers";

interface HourErrors {
    valid: boolean;
    message: string
}

export const hourErrorsValidation = (startTime: string, endTime: string ): HourErrors => {

    let errors: HourErrors = {
        valid: true,
        message: ''
    }

    const { hour: hourStart, minutes: minutesStart } = getHourFromString( startTime )
    const { hour: hourEnd, minutes: minutesEnd } = getHourFromString( endTime )

    
    if( Number(hourStart) > Number(hourEnd) ) {
        errors = {
            ...errors,
            valid: false,
            message: 'La hora inicial no debe ser posterior a la hora final'
        }
    }

    if( (Number(hourStart) === Number(hourEnd)) && (Number(minutesStart) >= Number(minutesEnd)) ) {
        errors = {
            ...errors,
            valid: false,
            message: 'La hora inicial no debe ser posterior o igual a la hora final'
        }
    }
    
    return errors;
}