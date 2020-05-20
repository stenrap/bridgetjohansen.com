const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

exports.getDay = index => {
  return days[index]
}

exports.sortStudents = students => {
  return students.sort((a, b) => {
    if (a.lessonDay !== b.lessonDay) return a.lessonDay - b.lessonDay
    if (a.lessonHour !== b.lessonHour) return a.lessonHour - b.lessonHour
    return a.lessonMinutes - b.lessonMinutes
  })
}
