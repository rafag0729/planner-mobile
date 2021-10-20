import { Activity, DayActivity, DayStructure, DateSpecs, MonthActivityStructure } from '../interfaces/appInterfaces';
import { militaryHours } from '../data/dateTimeData';
import { dateFormatted, getWorkDays, buildingWeek, getDateFromDateObj } from './helpersManager';





export const hourActivityStructure = (days: DateSpecs[], activities: Activity[] ): DayStructure[] => {
    
    let dayActivity: DayStructure[] = [];
    
    for( let i = 0; i < days.length; i++ ){

        let hourStructure: DayActivity[] = [];

        for( let i = 0; i < militaryHours.length; i++){

            let activitiesList: Activity[] = []
    
            if(activities){
                activities.forEach((a) => {
                    const splitHour = a.startTime.split(':');
                    if (Number(splitHour[0]) === militaryHours[i] ){
                        activitiesList.push({ ...a })
                    }
                })
            }

            hourStructure.push({
                hour: militaryHours[i],
                activity: activitiesList
            })
        }

        dayActivity.push({
            date: days[i],
            dayHourStructure: hourStructure
        })
    }

    return dayActivity;
}


export const monthlyDayActivityStructure = (daySelected: Date)/* : MonthActivityStructure */ => {
    
    let mondays = [];
    let tuesdays = [];
    let wednesdays = [];
    let thursdays = [];
    let fridays = [];

    const { monthNumber, year } = getDateFromDateObj( daySelected );
    let initialDate: Date = new Date(year, monthNumber);
    let dateToWork: Date = new Date(year, monthNumber, 1);


    for( let dayNumber = 1; initialDate.getMonth() === dateToWork.getMonth() ; dayNumber++){
        dateToWork = new Date( year, monthNumber, dayNumber);

        switch (dateToWork.getDay()) {
            case 1:
                mondays.push( getDateFromDateObj(dateToWork) )
                break;
            case 2:
                tuesdays.push( getDateFromDateObj(dateToWork) )
                break;
            case 3:
                wednesdays.push( getDateFromDateObj(dateToWork) )
                break;
            case 4:
                thursdays.push( getDateFromDateObj(dateToWork) )
                break;
            case 5:
                fridays.push( getDateFromDateObj(dateToWork) )
                break;
        }
    }


    const monthStructure = {
        mondays,
        tuesdays, 
        wednesdays,
        thursdays, 
        fridays
    }

    
    

    /* {
        dayName: DateSpecs;
        days: {
            day: DateSpecs;
            activity: Activity[]
        }[]
    } */


    return {

    }
}