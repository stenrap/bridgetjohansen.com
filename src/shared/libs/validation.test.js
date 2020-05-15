const { isValidLessonMinutes } = require('./validation')

describe('isValidLessonMinutes', () => {
  it('returns false when the minutes are not a number', () => {
    expect(isValidLessonMinutes('a')).toBe(false)
  })

  it('returns false when the minutes are negative', () => {
    expect(isValidLessonMinutes(-1)).toBe(false)
  })

  it('returns false when the minutes are greater than 55', () => {
    expect(isValidLessonMinutes(56)).toBe(false)
  })

  it('returns true when the minutes are 0', () => {
    expect(isValidLessonMinutes(0)).toBe(true)
  })

  it('returns true when the minutes are greater than 0, less than 55, and evenly divisible by five', () => {
    expect(isValidLessonMinutes(5)).toBe(true)
    expect(isValidLessonMinutes(10)).toBe(true)
    expect(isValidLessonMinutes(15)).toBe(true)
    expect(isValidLessonMinutes(20)).toBe(true)
    expect(isValidLessonMinutes(25)).toBe(true)
    expect(isValidLessonMinutes(30)).toBe(true)
    expect(isValidLessonMinutes(35)).toBe(true)
    expect(isValidLessonMinutes(40)).toBe(true)
    expect(isValidLessonMinutes(45)).toBe(true)
    expect(isValidLessonMinutes(50)).toBe(true)
    expect(isValidLessonMinutes(55)).toBe(true)
  })

  it('returns false when the minutes are greater than 0, less than 55, and not evenly divisible by five', () => {
    expect(isValidLessonMinutes(6)).toBe(false)
    expect(isValidLessonMinutes(12)).toBe(false)
    expect(isValidLessonMinutes(18)).toBe(false)
    expect(isValidLessonMinutes(24)).toBe(false)
    expect(isValidLessonMinutes(31)).toBe(false)
    expect(isValidLessonMinutes(37)).toBe(false)
    expect(isValidLessonMinutes(43)).toBe(false)
    expect(isValidLessonMinutes(49)).toBe(false)
  })
})
