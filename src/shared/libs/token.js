'use strict'

const { v4: uuid } = require('uuid')

module.exports = {
  createToken () {
    return uuid().replace(/-/g, '')
  }
}
