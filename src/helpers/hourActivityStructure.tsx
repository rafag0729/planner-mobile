import { Activity, DayActivity, DayStructure, DateSpecs } from '../interfaces/appInterfaces';
import { militaryHours } from '../data/dateTimeData';




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