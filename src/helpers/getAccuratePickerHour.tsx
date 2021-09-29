export const getAccuratePickerHour = (hourToFormat: Date) => {

    const hour = hourToFormat.getHours()
    const minutes = hourToFormat.getMinutes()
    const seconds = hourToFormat.getSeconds()

    return {
        hour,
        minutes,
        seconds
    }
}