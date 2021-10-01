import { TimeSpecs } from "../interfaces/appInterfaces";





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

    const hourArray = time.split(':');
    const minuteArray = hourArray[1].split(' ');

    /* const hour ;
    const minute;
    const seconds; */


    return {
        hour: 1,
        minutes: 1,
        seconds: 1
    }
}