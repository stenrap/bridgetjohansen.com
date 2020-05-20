const { sortStudents } = require('./student')

let students = [
  { name: 'Alice', lessonDay: 2, lessonHour: 3, lessonMinutes: 0 },
  { name: 'Bob', lessonDay: 2, lessonHour: 3, lessonMinutes: 30 },
  { name: 'Carol', lessonDay: 2, lessonHour: 4, lessonMinutes: 0 },
  { name: 'Dan', lessonDay: 3, lessonHour: 1, lessonMinutes: 15 }
]

describe('sortStudents', () => {
  describe('when the students are already sorted', () => {
    it('should keep them sorted', () => {
      sortStudents(students)
      expect(students[0].name).toBe('Alice')
      expect(students[1].name).toBe('Bob')
      expect(students[2].name).toBe('Carol')
      expect(students[3].name).toBe('Dan')
    })
  })

  describe('when the students are in reverse order', () => {
    beforeEach(() => {
      students = [
        { name: 'Dan', lessonDay: 3, lessonHour: 1, lessonMinutes: 15 },
        { name: 'Carol', lessonDay: 2, lessonHour: 4, lessonMinutes: 0 },
        { name: 'Bob', lessonDay: 2, lessonHour: 3, lessonMinutes: 30 },
        { name: 'Alice', lessonDay: 2, lessonHour: 3, lessonMinutes: 0 }
      ]
    })

    it('should sort them', () => {
      sortStudents(students)
      expect(students[0].name).toBe('Alice')
      expect(students[1].name).toBe('Bob')
      expect(students[2].name).toBe('Carol')
      expect(students[3].name).toBe('Dan')
    })
  })

  describe('when the students are in random order', () => {
    beforeEach(() => {
      students = [
        { name: 'Bob', lessonDay: 2, lessonHour: 3, lessonMinutes: 30 },
        { name: 'Carol', lessonDay: 2, lessonHour: 4, lessonMinutes: 0 },
        { name: 'Dan', lessonDay: 3, lessonHour: 1, lessonMinutes: 15 },
        { name: 'Alice', lessonDay: 2, lessonHour: 3, lessonMinutes: 0 }
      ]
    })

    it('should sort them', () => {
      sortStudents(students)
      expect(students[0].name).toBe('Alice')
      expect(students[1].name).toBe('Bob')
      expect(students[2].name).toBe('Carol')
      expect(students[3].name).toBe('Dan')
    })
  })
})
