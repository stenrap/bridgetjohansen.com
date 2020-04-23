const { AuthenticationError } = require('apollo-server-express')
const { OAuth2Client } = require('google-auth-library')

const { TOKEN_COOKIE, USER_TOKEN_EXPIRATION } = require('../shared/Constants')
const cookieLib = require('../shared/libs/cookie')
const scheduleDao = require('./daos/ScheduleDao')
const userDao = require('./daos/UserDao')

const client = new OAuth2Client(process.env.PIANO_GOOGLE_CLIENT_ID)

const resolvers = {
  Mutation: {
    async signIn (parent, { googleToken }, { res }) {
      let payload = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.PIANO_GOOGLE_CLIENT_ID
      })
      payload = payload.getPayload()
      const { token, user } = await userDao.signIn(payload.email, payload.sub)
      cookieLib.setCookie(res, new Date(Date.now() + (USER_TOKEN_EXPIRATION * 1000)), true, TOKEN_COOKIE, token)
      return user
    }
  },

  Query: {
    schedule (parent, args, { user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      return scheduleDao.getSchedule()
    }
  }
}

module.exports = resolvers
