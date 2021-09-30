export const getAccuratePickerHour = (hourToFormat: Date) => {


    let hour = hourToFormat.getHours().toString()
    let minutes = hourToFormat.getMinutes().toString()
    let seconds = hourToFormat.getSeconds().toString()
    let meridiem = Number(hour) > 13 ? 'pm' : 'am';

    
    if( hour.length === 1 ){
        hour = `0${hour}`;
    }

    if( minutes.length === 1 ){
        minutes = `0${minutes}`;
    }


    return {
        hour,
        minutes,
        seconds,
        meridiem
    }
}