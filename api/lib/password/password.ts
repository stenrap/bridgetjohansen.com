import crypto from 'crypto'

const ALGORITHM= 'pbkdf2'
const DIGEST = 'sha256'
const ITERATIONS = 12000
const KEY_LENGTH = 32
const SALT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const SALT_LENGTH = 12

export const hashPassword = (password: string): Promise<string> => {
  return new Promise<string>((resolve: (value: string) => void, reject: (err: Error) => void): void => {
    let salt = ''

    for (let i = 0; i < SALT_LENGTH; i++) {
      salt += SALT_CHARS.charAt(Math.floor(Math.random() * SALT_CHARS.length))
    }

    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (err: Error | null, derived: Buffer): void => {
      if (err) return reject(err)
      resolve(`${ALGORITHM}$${DIGEST}$${ITERATIONS}$${salt}$${derived.toString('base64')}`)
    })
  })
}

export const isValidPassword = (password: string, encodedPassword: string): Promise<boolean> => {
  return new Promise<boolean>((resolve: (value: boolean) => void, reject: (err: Error) => void): void => {
    const [, algorithm, iterations, salt, storedHash]: string[] = encodedPassword.split('$')

    crypto.pbkdf2(password, salt, parseInt(iterations), KEY_LENGTH, algorithm, (err: Error | null, derivedHash): void => {
      if (err) return reject(err)
      resolve(storedHash === derivedHash.toString('base64').trim())
    })
  })
}
