const { MAX_STRING_LENGTH, SATURDAY, SUNDAY } = require('../Constants')

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

exports.isValidLessonDay = day => {
  return day >= SUNDAY && day <= SATURDAY
}

exports.isValidLessonDuration = duration => {
  return duration === 30 || duration === 45 || duration === 60
}

exports.isValidLessonHour = hour => {
  return hour >= 1 && hour <= 12
}

exports.isValidLessonMinutes = minutes => {
  return minutes >= 0 && minutes <= 55 && minutes % 5 === 0
}

exports.isValidLessonMeridiem = meridiem => {
  return meridiem === 'am' || meridiem === 'pm'
}

exports.isValidString = string => {
  if (!string) return false
  const trimmed = string.trim()
  return trimmed.length > 0 && trimmed.length <= MAX_STRING_LENGTH
}
