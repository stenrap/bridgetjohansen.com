exports.sortDates = dates => {
  return dates.sort((a, b) => {
    const aDate = new Date()
    aDate.setMonth(a.month)
    aDate.setDate(a.date)
    aDate.setFullYear(a.year)

    const bDate = new Date()
    bDate.setMonth(b.month)
    bDate.setDate(b.date)
    bDate.setFullYear(b.year)

    return aDate.getTime() - bDate.getTime()
  })
}
