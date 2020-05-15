const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { OAuth2Client } = require('google-auth-library')

const {
  isValidEmailList,
  isValidLessonDay,
  isValidLessonHour,
  isValidLessonMinutes,
  isValidLessonDuration,
  isValidString
} = require('../shared/libs/validation')
const { TOKEN_COOKIE, USER_TOKEN_EXPIRATION } = require('../shared/Constants')
const cookieLib = require('../shared/libs/cookie')
const scheduleDao = require('./daos/ScheduleDao')
const studentDao = require('./daos/StudentDao')
const userDao = require('./daos/UserDao')

const client = new OAuth2Client(process.env.PIANO_GOOGLE_CLIENT_ID)

const resolvers = {
  Mutation: {
    async effectiveDate (parent, { month, date, year }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')
      await scheduleDao.updateEffectiveDate(month, date, year)
      return { success: true }
    },
    async signIn (parent, { googleToken }, { res }) {
      let payload = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.PIANO_GOOGLE_CLIENT_ID
      })
      payload = payload.getPayload()
      const { token, user } = await userDao.signIn(payload.email, payload.sub)
      cookieLib.setCookie(res, new Date(Date.now() + (USER_TOKEN_EXPIRATION * 1000)), true, TOKEN_COOKIE, token)
      return user
    },
    async signOut (parent, args, { res, user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      await userDao.signOut(user.id)
      cookieLib.clearCookie(res, new Date(0), true, TOKEN_COOKIE)
      return { success: true }
    },
    async student (parent, { targetStudent }, { user }) {
      if (!user) throw new AuthenticationError('Unauthorized')

      const validStudent = targetStudent &&
        isValidString(targetStudent.name) &&
        isValidString(targetStudent.parents) &&
        isValidString(targetStudent.phone) &&
        isValidLessonDay(targetStudent.lessonDay) &&
        isValidLessonHour(targetStudent.lessonHour) &&
        isValidLessonMinutes(targetStudent.lessonMinutes) &&
        isValidLessonDuration(targetStudent.lessonDuration) &&
        isValidEmailList(targetStudent.users.map(user => user.email))

      if (!validStudent) throw new UserInputError('Invalid data')

      if (!targetStudent.id) {
        return studentDao.insertStudent(targetStudent)
      } else {
        // Validate the id...then updateStudent()...
      }
    }
  },

  Query: {
    getUser (parent, args, { user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      return user
    },
    schedule (parent, args, { user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      return scheduleDao.selectSchedule()
    }
  }
}

module.exports = resolvers
