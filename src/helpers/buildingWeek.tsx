import { DateSpecs } from '../interfaces/appInterfaces';
import { getDateFromDateObj } from './helpersManager';



export const buildingWeek = (date: Date): DateSpecs[] => {

    const weekToBuild: DateSpecs[] = []

    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const monthNumber = date.getMonth();
    const year = date.getFullYear();

    const startDay = day - dayOfWeek;

    for( let i = 0; i <= 6; i++){
        const day = new Date(year, monthNumber, startDay + i )
        weekToBuild.push( getDateFromDateObj(day)  )
    }

    return weekToBuild;
}