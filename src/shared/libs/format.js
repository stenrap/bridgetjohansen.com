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
  date ({ month, date, year }) {
    return `${MONTHS[month]} ${date}, ${year}`
  },

  minutes (minutes) {
    if (minutes < 10) return `0${minutes}`
    return minutes
  },

  monthAndYear (date) {
    return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
  }
}
