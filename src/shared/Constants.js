module.exports = Object.freeze({
  /* ------------ */
  /* Cookie Names */
  /* ------------ */
  TOKEN_COOKIE: 'token',

  /* ---------- */
  /* Day Values */
  /* ---------- */
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,

  /* ----------- */
  /* Expirations */
  /* ----------- */
  USER_TOKEN_EXPIRATION: 60 * 60 * 24 * 60, // 60 days (in seconds)

  /* -------------- */
  /* Response Codes */
  /* -------------- */

  CLIENT_NETWORK_ERROR: 1
})
