const { MAX_STRING_LENGTH, SATURDAY, SUNDAY } = require('../Constants')

export function isValidEmail (email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email) &&
    email.length <= MAX_STRING_LENGTH
}

export function isValidEmailList (emails) {
  if (!Array.isArray(emails) || emails.length === 0) return false

  for (const email of emails) {
    if (!isValidEmail(email)) return false
  }

  return true
}

export function isValidLessonDay (day) {
  return day >= SUNDAY && day <= SATURDAY
}

export function isValidString (string) {
  if (!string) return false
  const trimmed = string.trim()
  return trimmed.length > 0 && trimmed.length <= MAX_STRING_LENGTH
}
