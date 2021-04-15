/*
  If these types are changed, don't forget to change
  their counterparts in the /api/typedefs directory.
*/

export enum NonceType {
  NEW = 'NEW',
  RESET = 'RESET'
}

export default interface Nonce {
  nonce: string
  type: NonceType
}
