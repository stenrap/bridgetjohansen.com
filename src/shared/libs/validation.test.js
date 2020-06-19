const { isValidMinutes } = require('./validation')

describe('isValidMinutes', () => {
  it('returns false when the minutes are not a number', () => {
    expect(isValidMinutes('a')).toBe(false)
  })

  it('returns false when the minutes are negative', () => {
    expect(isValidMinutes(-1)).toBe(false)
  })

  it('returns false when the minutes are greater than 55', () => {
    expect(isValidMinutes(56)).toBe(false)
  })

  it('returns true when the minutes are 0', () => {
    expect(isValidMinutes(0)).toBe(true)
  })

  it('returns true when the minutes are greater than 0, less than 55, and evenly divisible by five', () => {
    expect(isValidMinutes(5)).toBe(true)
    expect(isValidMinutes(10)).toBe(true)
    expect(isValidMinutes(15)).toBe(true)
    expect(isValidMinutes(20)).toBe(true)
    expect(isValidMinutes(25)).toBe(true)
    expect(isValidMinutes(30)).toBe(true)
    expect(isValidMinutes(35)).toBe(true)
    expect(isValidMinutes(40)).toBe(true)
    expect(isValidMinutes(45)).toBe(true)
    expect(isValidMinutes(50)).toBe(true)
    expect(isValidMinutes(55)).toBe(true)
  })

  it('returns false when the minutes are greater than 0, less than 55, and not evenly divisible by five', () => {
    expect(isValidMinutes(6)).toBe(false)
    expect(isValidMinutes(12)).toBe(false)
    expect(isValidMinutes(18)).toBe(false)
    expect(isValidMinutes(24)).toBe(false)
    expect(isValidMinutes(31)).toBe(false)
    expect(isValidMinutes(37)).toBe(false)
    expect(isValidMinutes(43)).toBe(false)
    expect(isValidMinutes(49)).toBe(false)
  })
})
