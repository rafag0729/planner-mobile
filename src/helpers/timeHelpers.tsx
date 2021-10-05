import { TimeSpecs } from '../interfaces/appInterfaces';





export const getHourFromDateObj = (time: Date): TimeSpecs  => {

    let hour = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()
    
    let meridiem = Number(hour) > 11 ? 'pm' : 'am';

    return {
        hour,
        minutes,
        seconds,
        meridiem
    }
}


export const getHourFromString = (time: string): TimeSpecs => {

    const [ hour, minutes ] = time.split(':');

    return {
        hour,
        minutes
    }
    
}

export const timeFormatted = ({ hour, minutes, meridiem }: TimeSpecs, militaryHours: boolean = true): string => {

    let hourFormatted = hour;

    if ( militaryHours ){
        
        if( hour > 12  ){
            hourFormatted = Number(hour) - 12;
        }

        return `${hourFormatted < 10 ? '0'+hourFormatted.toString() : hourFormatted }:${minutes < 10 ? '0'+minutes.toString() : minutes } ${meridiem}`;
    } else {

        return `${hourFormatted < 10 ? '0'+hourFormatted.toString() : hourFormatted }:${minutes < 10 ? '0'+minutes.toString() : minutes }` 
    }
}