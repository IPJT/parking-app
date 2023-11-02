import { Feature } from '../../../../clients/StockholmParkering'

const swedishDays: string[] = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']

export function getMillisecondsUntilNextInterval(input: Feature['properties']): number {
  const currentDate = new Date()
  const currentDayIndex = currentDate.getDay() // Sunday = 0, Monday = 1, etc.
  const targetDayIndex = swedishDays.indexOf(input.START_WEEKDAY.toLowerCase())

  if (targetDayIndex === -1) throw new Error('Invalid Swedish weekday provided.')

  const currentHourMinute = currentDate.getHours() * 100 + currentDate.getMinutes()

  // If the current weekday matches the input's START_WEEKDAY and current time is within the interval
  if (
    currentDayIndex === targetDayIndex &&
    currentHourMinute >= input.START_TIME &&
    currentHourMinute < input.END_TIME
  ) {
    return 0
  }

  let daysToAdd = (targetDayIndex - currentDayIndex + 7) % 7 // +7 to ensure non-negative result

  // If the target weekday is today, but the time has not yet started
  if (daysToAdd === 0 && currentHourMinute < input.START_TIME) {
    daysToAdd = 0
  } else if (daysToAdd === 0 && currentHourMinute >= input.END_TIME) {
    daysToAdd = 7
  }

  // Set the result date to the target day
  const nextIntervalDate = new Date(currentDate)
  nextIntervalDate.setDate(currentDate.getDate() + daysToAdd)

  // Set the time for the start of the interval
  const targetHour = Math.floor(input.START_TIME / 100)
  const targetMinute = input.START_TIME % 100
  nextIntervalDate.setHours(targetHour, targetMinute, 0, 0) // reset seconds and milliseconds

  // Calculate the difference in milliseconds
  return nextIntervalDate.getTime() - currentDate.getTime()
}
