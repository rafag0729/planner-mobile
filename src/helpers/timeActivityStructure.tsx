import { Activity, DayStructure, DateSpecs, ActivityPerDayForMonth } from '../interfaces/appInterfaces';
import { dateFormatted, getDateFromDateObj } from './helpersManager';





export const hourActivityStructure = (days: DateSpecs[], activities: Activity[] ): DayStructure[] => {
    
    let dayActivity: DayStructure[] = [];
    

    for( let idx = 0; idx < days.length; idx++ ){

        let activitiesList: Activity[] = []
        
        if(activities){
            activities.forEach((a) => {
                if(a.day === dateFormatted(days[idx])){
                    activitiesList.push({ ...a })
                }
            })
        }

        dayActivity.push({
            date: days[idx],
            activitiesOfDate: activitiesList,
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