import { dateFormatted, getDateFromDateObj } from "./helpersManager";




export const getMonthDays = (date: Date) => {

    const { monthNumber, year } = getDateFromDateObj( date );
    let initialDate: Date = new Date(year, monthNumber);
    let dateToWork: Date = new Date(year, monthNumber, 1);

    let firstPackOfDays: string[] = [];
    let secondPackOfDays: string[] = [];
    let thirdPackOfDays: string[] = [];


    for( let dayNumber = 1; initialDate.getMonth() === dateToWork.getMonth() ; dayNumber++){
        dateToWork = new Date( year, monthNumber, dayNumber);
        
        if(dateToWork.getDay() !== 0 && dateToWork.getDay() !== 6){

            if(firstPackOfDays.length <= 9){
                firstPackOfDays.push( dateFormatted(getDateFromDateObj(dateToWork)))
            } else if(secondPackOfDays.length <= 9){
                secondPackOfDays.push( dateFormatted(getDateFromDateObj(dateToWork)))
            } else if(thirdPackOfDays.length <= 9){
                thirdPackOfDays.push( dateFormatted(getDateFromDateObj(dateToWork)))
            }
        }
    }

        return [firstPackOfDays, secondPackOfDays, thirdPackOfDays];
}