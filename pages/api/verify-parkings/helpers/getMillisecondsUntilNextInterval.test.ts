import { getMillisecondsUntilNextInterval } from './getMillisecondsUntilNextInterval'

describe('getMillisecondsUntilNextInterval', () => {
  const _Date = Date

  it('should return 0 if current time is within the interval', () => {
    const currentDate = new Date('2022-02-14T09:30:00') // Monday
    jest.spyOn(global, 'Date').mockImplementation((date) => {
      if (date) {
        return new _Date(date)
      }
      return currentDate
    })

    const input = {
      START_WEEKDAY: 'Måndag',
      START_TIME: 900,
      END_TIME: 1700,
    }

    const result = getMillisecondsUntilNextInterval(input)
    expect(result).toBe(0)
  })

  it('should return the correct number of milliseconds until the next interval', () => {
    const currentDate = new Date('2022-02-15T08:30:00') // Tuesday
    jest.spyOn(global, 'Date').mockImplementation((date) => {
      if (date) {
        return new _Date(date)
      }
      return currentDate
    })
    const input = {
      START_WEEKDAY: 'tisdag',
      START_TIME: 900,
      END_TIME: 1700,
    }

    const result = getMillisecondsUntilNextInterval(input)
    expect(result).toBe(30 * 60 * 1000) // 30 minutes until the interval starts
  })

  it('should return the correct number of milliseconds until the next interval', () => {
    const currentDate = new Date('2022-02-18T08:30:00') // fredag
    jest.spyOn(global, 'Date').mockImplementation((date) => {
      if (date) {
        return new _Date(date)
      }
      return currentDate
    })
    const input = {
      START_WEEKDAY: 'söndag',
      START_TIME: 830,
      END_TIME: 1700,
    }

    const result = getMillisecondsUntilNextInterval(input)
    expect(result).toBe(2 * 24 * 60 * 60 * 1000) // 2 days until the interval starts
  })

  it('should return the correct number of milliseconds until the next interval', () => {
    const currentDate = new Date('2022-02-16T17:30:00') // Wednesday
    jest.spyOn(global, 'Date').mockImplementation((date) => {
      if (date) {
        return new _Date(date)
      }
      return currentDate
    })
    const input = {
      START_WEEKDAY: 'onsdag',
      START_TIME: 1700,
      END_TIME: 1715,
    }

    const result = getMillisecondsUntilNextInterval(input)
    expect(result).toBe(6 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 30 * 60 * 1000) // 6 days, 23 hours and 30 minutes until the interval starts
  })

  it('should throw an error if an invalid Swedish weekday is provided', () => {
    const input = {
      START_WEEKDAY: 'Invalid weekday',
      START_TIME: 900,
      END_TIME: 1700,
    }
    expect(() => getMillisecondsUntilNextInterval(input)).toThrow('Invalid Swedish weekday provided.')
  })
})
