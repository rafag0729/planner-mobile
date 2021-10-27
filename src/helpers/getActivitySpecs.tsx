import { Activity } from '../interfaces/appInterfaces';
import { getHourFromString, hourErrorsValidation } from './helpersManager';



export const getActivitySpecs = ({ activityType, day, description, endTime, startTime, projectName}: Activity) => {

    const positionMultiplier = getActivityPosition( startTime )

    const lengthMultiplier = getActivityLength( startTime, endTime );

    return [
        positionMultiplier,
        lengthMultiplier
    ]
}

const getActivityPosition = ( startTime: string ):number => {
    
    const { hour, minutes } = getHourFromString( startTime );
    
    const positionHour = (Number(hour) - 7) * 4;
    const positionMinute = Number(minutes) / 15;

    return positionHour + positionMinute;
}

const getActivityLength = ( startTime: string, endTime: string ): number => {

    const { valid } = hourErrorsValidation( startTime, endTime)

    let lengthMultiplier: number; 

    if(valid){
        
        const { hour: hourStart, minutes: minutesStart } = getHourFromString( startTime )
        const { hour: hourEnd, minutes: minutesEnd } = getHourFromString( endTime )

        let minutesDif = Number(minutesEnd) - Number(minutesStart);
        let hoursDif = (Number(hourEnd) - Number(hourStart)) * 60;

        let totalDif = hoursDif + ( minutesDif )
        
        lengthMultiplier = totalDif / 15;
        
    } else {

        lengthMultiplier = 0;
    }
    
    return lengthMultiplier;
}