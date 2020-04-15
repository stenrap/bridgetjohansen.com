const resolvers = {
  Mutation: {
    authenticate (parent, { googleToken }) {
      return {
        admin: true,
        email: 'admin@bridgetjohansen.com',
        googleId: 'd4e5f6',
        id: 2
      }
    }
  },

  Query: {
    schedule () {
      return {
        date: 14,
        groupClassDates: [
          {
            date: 14,
            id: 1,
            month: 4,
            year: 2020
          }
        ],
        groupClassTimes: [
          {
            hour: 3,
            id: 1,
            minutes: 30,
            students: [
              {
                id: 1,
                lessonDay: 2,
                lessonDuration: 45,
                lessonHour: 14,
                lessonMinutes: 0,
                name: 'Michelle Peterson',
                parents: 'Everett & Cynthia',
                phone: '801-419-5982',
                users: [
                  {
                    admin: false,
                    email: 'everett.peterson@gmail.com',
                    googleId: 'a1b2c3',
                    id: 3
                  }
                ]
              }
            ]
          }
        ],
        month: 8,
        students: [
          {
            id: 1,
            lessonDay: 2,
            lessonDuration: 45,
            lessonHour: 14,
            lessonMinutes: 0,
            name: 'Michelle Peterson',
            parents: 'Everett & Cynthia',
            phone: '801-419-5982',
            users: [
              {
                admin: false,
                email: 'everett.peterson@gmail.com',
                googleId: 'a1b2c3',
                id: 3
              }
            ]
          }
        ],
        year: 2019
      }
    }
  }
}

module.exports = resolvers
