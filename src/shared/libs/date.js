exports.sortDates = dates => {
  return dates.sort((a, b) => {
    const aDate = new Date()
    aDate.setMonth(a.month)
    aDate.setDate(a.date)
    aDate.setFullYear(a.year)

    const bDate = new Date()
    bDate.setMonth(a.month)
    bDate.setDate(a.date)
    bDate.setFullYear(a.year)

    return aDate.getTime() - bDate.getTime()
  })
}
