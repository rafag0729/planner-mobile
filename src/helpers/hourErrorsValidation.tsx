import { HourErrors } from "../interfaces/appInterfaces";
import { getHourFromString } from "./timeHelpers";


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

export const singleHourValidation = (time: string) => {

    let errors: HourErrors = {
        valid: true,
        message: ''
    }
    
    if(time!== '--:-- am/pm'){
        const { hour } = getHourFromString( time )
            
        if(Number(hour) < 7 || Number(hour) > 19) {
            errors = {
                ...errors,
                valid: false,
                message: 'Las horas validas para el registro de actividades es entre 7:00am y 7:00pm'
            }
        }
    }
    
    return errors;
}