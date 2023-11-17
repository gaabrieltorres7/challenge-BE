export class UserAlreadyAssociatedError extends Error {
  constructor() {
    super('User already associated with a client')
  }
}
