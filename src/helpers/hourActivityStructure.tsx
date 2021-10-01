import { Activity, DayActivity } from "../interfaces/appInterfaces";



export const hourActivityStructure = (dayHours: number[], activities: Activity[] ) => {
        
    let dayActivity: DayActivity[] = [];

    dayHours.forEach((h) => {

        let activitiesList: Activity[] = []

        if(activities){
            activities.forEach((a) => {
                const splitHour = a.startTime.split(':');
                if (Number(splitHour[0]) === h ){
                    activitiesList.push({ ...a })
                }
            })
        }

        dayActivity.push({
            hour: h,
            activity: activitiesList
        })
        
    })

    return dayActivity;
}