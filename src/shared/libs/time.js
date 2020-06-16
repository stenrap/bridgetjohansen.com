exports.sortTimes = times => {
  return times.sort((a, b) => {
    if (a.hour !== b.hour) {
      const hourA = a.hour + (a.hour < 12 && a.meridiem === 'pm' ? 12 : 0)
      const hourB = b.hour + (b.hour < 12 && b.meridiem === 'pm' ? 12 : 0)
      return hourA - hourB
    }
    return a.minutes - b.minutes
  })
}
