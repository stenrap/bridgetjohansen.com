const { MAX_STRING_LENGTH, SATURDAY, SUNDAY } = require('../Constants')

exports.isValidDate = date => {
  return /^\d+$/.test(date) && date >= 1 && date <= 31 // Yes, this isn't valid for February. Yawn.
}

const isValidEmail = email => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email) &&
    email.length <= MAX_STRING_LENGTH
}

exports.isValidEmailList = emails => {
  if (!Array.isArray(emails) || emails.length === 0) return false

  for (const email of emails) {
    if (!isValidEmail(email)) return false
  }

  return true
}

exports.isValidEventExpiration = expiration => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0)
  tomorrow.setMinutes(0)
  tomorrow.setSeconds(0)
  tomorrow.setMilliseconds(0)
  return expiration.getTime() >= tomorrow.getTime()
}

exports.isValidId = id => {
  return /^\d+$/.test(id) && id > 0
}

exports.isValidGroupClassTimeDuration = duration => {
  return duration === 30 || duration === 45 || duration === 50 || duration === 60
}

exports.isValidHour = hour => {
  return hour >= 1 && hour <= 12
}

exports.isValidLessonDay = day => {
  return day >= SUNDAY && day <= SATURDAY
}

exports.isValidLessonDuration = duration => {
  return duration === 30 || duration === 45 || duration === 60
}

exports.isValidListOfIds = ids => {
  if (!Array.isArray(ids) || ids.length === 0) return false
  for (const id of ids) {
    if (!exports.isValidId(id)) return false
  }
  return true
}

exports.isValidMeridiem = meridiem => {
  return meridiem === 'am' || meridiem === 'pm'
}

exports.isValidMinutes = minutes => {
  return minutes >= 0 && minutes <= 55 && minutes % 5 === 0
}

exports.isValidMonth = month => {
  return /^\d+$/.test(month) && month >= 0 && month <= 11
}

exports.isValidString = string => {
  if (!string) return false
  const trimmed = string.trim()
  return trimmed.length > 0 && trimmed.length <= MAX_STRING_LENGTH
}

exports.isValidYear = year => {
  return /^\d\d\d\d$/.test(year) // Yes, the year could be 1297. Yawn.
}
