const { MAX_STRING_LENGTH } = require('../Constants')

module.exports = {
  /**
   * Check whether an email passes the regex validation defined by the HTML5 spec:
   *
   * https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail
   *
   * Note that the regex below deviates from the HTML5 spec by requiring at least
   * one period in the domain. This was achieved by changing the final * character
   * to a + character.
   *
   * @param email {string} The email to validate.
   * @returns {boolean}
   */
  isValidEmail (email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email) &&
      email.length <= MAX_STRING_LENGTH
  },

  isValidString (string) {
    if (!string) return false
    const trimmed = string.trim()
    return trimmed.length > 0 && trimmed.length <= MAX_STRING_LENGTH
  }
}
