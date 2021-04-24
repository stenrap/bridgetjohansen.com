/*
  If this type is changed, don't forget to change
  its counterpart in the /api/typedefs directory.
*/

export default interface CreateAccountInput {
  code: string
  email: string
  firstName: string
  lastName: string
  nonce: string
  password: string
}
