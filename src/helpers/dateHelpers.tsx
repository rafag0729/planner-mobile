import { DateSpecs } from '../interfaces/appInterfaces';
import { daysOfWeek, months } from '../data/dateTimeData';




export const getDateFromDateObj = ( date: Date ): DateSpecs => {

    const day = date.getDate();
    const dayName = daysOfWeek[date.getDay()];
    const monthNumber = date.getMonth();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return {
        day,
        dayName,
        monthNumber,
        monthName,
        year
    }
}

export const dateSpectsToSystemDate = (date: DateSpecs): Date => {

    const {day, monthNumber, year} = date;
    const systemDate = new Date(year, monthNumber, day);

    return systemDate;
}

export const dateFormatted = ({ day, monthNumber, year}: DateSpecs): string => {

    return `${day}-${monthNumber+1}-${year}`;
}

