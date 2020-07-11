exports.sortEvents = events => {
  return events.sort((a, b) => {
    return a.expiration - b.expiration
  })
}
