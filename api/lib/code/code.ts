export const createCode = (): string => {
  const min = 0
  const max = 9

  let code = ''
  let count = 0

  while (count < 6) {
    code += Math.floor(Math.random() * (max - min + 1) + min).toString()
    count++
  }

  return code
}
