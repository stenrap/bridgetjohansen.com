const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { OAuth2Client } = require('google-auth-library')

const {
  isValidDate,
  isValidEmailList,
  isValidGroupClassTimeDuration,
  isValidHour,
  isValidId,
  isValidLessonDay,
  isValidLessonDuration,
  isValidListOfIds,
  isValidMeridiem,
  isValidMinutes,
  isValidMonth,
  isValidString,
  isValidYear
} = require('../shared/libs/validation')
const { TOKEN_COOKIE, USER_TOKEN_EXPIRATION } = require('../shared/Constants')
const cookieLib = require('../shared/libs/cookie')
const parentDao = require('./daos/ParentDao')
const scheduleDao = require('./daos/ScheduleDao')
const studentDao = require('./daos/StudentDao')
const userDao = require('./daos/UserDao')

const client = new OAuth2Client(process.env.PIANO_GOOGLE_CLIENT_ID)

const resolvers = {
  Mutation: {
    async createGroupClass (previousResolver, { month, date, year }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validDate = isValidMonth(month) &&
        isValidDate(date) &&
        isValidYear(year)

      if (!validDate) throw new UserInputError('Invalid data')

      return scheduleDao.insertGroupClass({ month, date, year })
    },
    async createGroupClassTime (previousResolver, { groupClassTime }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validGroupClassTime = isValidHour(groupClassTime.hour) &&
        isValidMinutes(groupClassTime.minutes) &&
        isValidMeridiem(groupClassTime.meridiem) &&
        isValidGroupClassTimeDuration(groupClassTime.duration) &&
        isValidListOfIds(groupClassTime.studentIds)

      if (!validGroupClassTime) throw new UserInputError('Invalid data')

      return scheduleDao.insertGroupClassTime(groupClassTime)
    },
    async createParent (previousResolver, { parent }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validParent = parent &&
        isValidString(parent.name) &&
        isValidString(parent.phone) &&
        isValidEmailList(parent.emails)

      if (!validParent) throw new UserInputError('Invalid data')

      return parentDao.insertParent(parent)
    },
    async createStudent (previousResolver, { student }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validStudent = student &&
        isValidString(student.name) &&
        isValidLessonDay(student.lessonDay) &&
        isValidHour(student.lessonHour) &&
        isValidMinutes(student.lessonMinutes) &&
        isValidMeridiem(student.lessonMeridiem) &&
        isValidLessonDuration(student.lessonDuration) &&
        isValidListOfIds(student.parentIds)

      if (!validStudent) throw new UserInputError('Invalid data')

      return studentDao.insertStudent(student)
    },
    async deleteGroupClass (previousResolver, { id }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')
      await scheduleDao.deleteGroupClass(id)
      return { success: true }
    },
    async deleteStudent (previousResolver, { id }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')
      return studentDao.deleteStudent(id)
    },
    async signIn (previousResolver, { googleToken }, { res }) {
      let payload = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.PIANO_GOOGLE_CLIENT_ID
      })
      payload = payload.getPayload()
      const { token, user } = await userDao.signIn(payload.email, payload.sub)
      cookieLib.setCookie(res, new Date(Date.now() + (USER_TOKEN_EXPIRATION * 1000)), true, TOKEN_COOKIE, token)
      return user
    },
    async signOut (previousResolver, args, { res, user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      await userDao.signOut(user.id)
      cookieLib.clearCookie(res, new Date(0), true, TOKEN_COOKIE)
      return { success: true }
    },
    async updateEffectiveDate (previousResolver, { month, date, year }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validDate = isValidMonth(month) &&
        isValidDate(date) &&
        isValidYear(year)

      if (!validDate) throw new UserInputError('Invalid data')

      await scheduleDao.updateEffectiveDate(month, date, year)
      return { success: true }
    },
    async updateGroupClass (previousResolver, { id, month, date, year }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validDate = isValidId(id) &&
        isValidMonth(month) &&
        isValidDate(date) &&
        isValidYear(year)

      if (!validDate) throw new UserInputError('Invalid data')

      await scheduleDao.updateGroupClass(id, month, date, year)
      return { success: true }
    },
    async updateGroupClassTime (previousResolver, { groupClassTime }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validGroupClassTime = isValidId(groupClassTime.id) &&
        isValidHour(groupClassTime.hour) &&
        isValidMinutes(groupClassTime.minutes) &&
        isValidMeridiem(groupClassTime.meridiem) &&
        isValidGroupClassTimeDuration(groupClassTime.duration) &&
        isValidListOfIds(groupClassTime.studentIds)

      if (!validGroupClassTime) throw new UserInputError('Invalid data')

      await scheduleDao.updateGroupClassTime(groupClassTime)
      return { success: true }
    },
    async updateParent (previousResolver, { parent }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validParent = parent &&
        isValidId(parent.id) &&
        isValidString(parent.name) &&
        isValidString(parent.phone) &&
        isValidEmailList(parent.emails)

      if (!validParent) throw new UserInputError('Invalid data')

      return parentDao.updateParent(parent)
    },
    async updateStudent (previousResolver, { student }, { user }) {
      if (!user || !user.admin) throw new AuthenticationError('Unauthorized')

      const validStudent = student &&
        isValidId(student.id) &&
        isValidString(student.name) &&
        isValidLessonDay(student.lessonDay) &&
        isValidHour(student.lessonHour) &&
        isValidMinutes(student.lessonMinutes) &&
        isValidMeridiem(student.lessonMeridiem) &&
        isValidLessonDuration(student.lessonDuration) &&
        isValidListOfIds(student.parentIds)

      if (!validStudent) throw new UserInputError('Invalid data')

      await studentDao.updateStudent(student)
      return { success: true }
    }
  },

  Query: {
    fetchSchedule (previousResolver, args, { user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      return scheduleDao.selectSchedule()
    },
    fetchUser (previousResolver, args, { user }) {
      if (!user) throw new AuthenticationError('Unauthorized')
      return user
    }
  }
}

module.exports = resolvers
