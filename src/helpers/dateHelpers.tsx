import { DateSpecs } from '../interfaces/appInterfaces';
import { daysOfWeek, months } from '../data/dateTimeData';




export const getDateFromDateObj = ( date: Date ): DateSpecs => {

    const day = date.getDate();
    const dayName = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return {
        day,
        dayName,
        month,
        year
    }
}

export const dateFormatted = ({ day, month, year}: DateSpecs): string => {

    return `${day}-${month}-${year}`;
}

