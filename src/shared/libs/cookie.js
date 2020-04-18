'use strict'

const DOMAIN = 'bridgetjohansen.com'

module.exports = {
  setCookie (res, date, httpOnly, name, value) {
    const options = {
      domain: DOMAIN,
      expires: date,
      httpOnly: httpOnly,
      secure: process.env.NODE_ENV === 'production'
    }
    res.cookie(name, value, options)
  },

  clearCookie (res, date, httpOnly, name) {
    const options = {
      domain: DOMAIN,
      expires: date,
      httpOnly: httpOnly,
      secure: process.env.NODE_ENV === 'production'
    }
    res.clearCookie(name, options)
  }
}
