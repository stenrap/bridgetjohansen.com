'use strict'

const winston = require('winston')

const transports = []

if (process.env.NODE_ENV === 'production') {
  transports.push(new winston.transports.File({ filename: '/var/log/nodejs/piano.log' }))
} else {
  transports.push(new winston.transports.Console())
}

const format = winston.format.printf(info => {
  const now = new Date()
  const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
  const year = now.getFullYear()
  const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
  const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
  let ms = now.getMilliseconds()

  if (ms < 10) {
    ms = `00${ms}`
  } else if (ms < 100) {
    ms = `0${ms}`
  }

  return `${month}-${date}-${year} ${hours}:${minutes}:${seconds}.${ms} [${info.level.toUpperCase()}] ${info.message}`
})

module.exports = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(winston.format.splat(), format),
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports
})
