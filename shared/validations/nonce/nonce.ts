export const validateNonce = (nonce: string): void => {
  if (!/^[0-9a-f]+$/i.test(nonce)) {
    throw new Error('Invalid nonce.')
  }
}
