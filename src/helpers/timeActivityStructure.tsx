import { Activity, DayActivity, DayStructure, DateSpecs, ActivityPerDayForMonth } from '../interfaces/appInterfaces';
import { militaryHours } from '../data/dateTimeData';
import { dateFormatted, getDateFromDateObj } from './helpersManager';





export const hourActivityStructure = (days: DateSpecs[], activities: Activity[] ): DayStructure[] => {
    
    let dayActivity: DayStructure[] = [];

    for( let idx = 0; idx < days.length; idx++ ){

        let hourStructure: DayActivity[] = [];

        for( let i = 0; i < militaryHours.length; i++){

            let activitiesList: Activity[] = []
    
            if(activities){
                activities.forEach((a) => {
                    const splitHour = a.startTime.split(':');
                    const splitDay = a.day.split('-');
                    if (Number(splitHour[0]) === militaryHours[i] && Number(splitDay[0]) === days[idx].day && Number(splitDay[1]) === days[idx].monthNumber+1 && Number(splitDay[2]) === days[idx].year   ){
                        
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
            date: days[idx],
            dayHourStructure: hourStructure
        })
    }

    return dayActivity;
}


export const monthlyDayActivityStructure = (daySelected: DateSpecs, activities: Activity[] ): ActivityPerDayForMonth[] => {
    
    let days: ActivityPerDayForMonth[] = [];

    const { monthNumber, year } = daySelected;
    let initialDate: Date = new Date(year, monthNumber);
    let dateToWork: Date = new Date(year, monthNumber, 1);


    for( let dayNumber = 1; initialDate.getMonth() === dateToWork.getMonth(); dayNumber++){
        dateToWork = new Date( year, monthNumber, dayNumber);

        if (initialDate.getMonth() === dateToWork.getMonth() && dateToWork.getDay() !== 0 && dateToWork.getDay() !== 6 ){
            days.push({
                day: getDateFromDateObj(dateToWork),
                activity: activities.filter(a => a.day === dateFormatted(getDateFromDateObj(dateToWork)) )
            })
        }
    }

    return days;
}