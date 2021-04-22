export const validateCode = (code: string): void => {
  if (!/^\d{6}$/.test(code)) {
    throw new Error('That\'s not a valid code.')
  }
}
