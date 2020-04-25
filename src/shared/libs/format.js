'use strict'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

module.exports = {
  date (month, date, year) {
    return `${MONTHS[month]} ${date}, ${year}`
  }
}
