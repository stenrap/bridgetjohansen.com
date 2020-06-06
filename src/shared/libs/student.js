const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

exports.getDay = index => {
  return days[index]
}

exports.sortStudents = students => {
  return students.sort((a, b) => {
    if (a.lessonDay !== b.lessonDay) return a.lessonDay - b.lessonDay
    if (a.lessonHour !== b.lessonHour) {
      const lessonHourA = a.lessonHour + (a.lessonHour < 12 && a.lessonMeridiem === 'pm' ? 12 : 0)
      const lessonHourB = b.lessonHour + (b.lessonHour < 12 && b.lessonMeridiem === 'pm' ? 12 : 0)
      return lessonHourA - lessonHourB
    }
    return a.lessonMinutes - b.lessonMinutes
  })
}
