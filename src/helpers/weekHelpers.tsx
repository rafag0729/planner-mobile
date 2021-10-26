import { WeekData } from '../interfaces/appInterfaces';
import { dateFormatted, getDateFromDateObj } from './helpersManager';




export const buildingWeek = (date: Date): WeekData => {

    const weekToBuild: WeekData = {
        weekObj: [],
        weekStr: []
    }

    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const monthNumber = date.getMonth();
    const year = date.getFullYear();

    const startDay = day - dayOfWeek;

    for( let i = 0; i <= 6; i++){
        const day = new Date(year, monthNumber, startDay + i );
        weekToBuild.weekObj.push( getDateFromDateObj(day) );
        weekToBuild.weekStr.push( dateFormatted(getDateFromDateObj(day)) );
    }
    
    return weekToBuild;
}

export const getWorkDays = (week: WeekData): WeekData => {
    
    week.weekObj.shift();
    week.weekStr.shift();
    week.weekObj.pop();
    week.weekStr.pop();

    return {
        weekObj: week.weekObj,
        weekStr: week.weekStr
    }
}