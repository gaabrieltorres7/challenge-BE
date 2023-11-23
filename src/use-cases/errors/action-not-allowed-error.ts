export class ActionNotAllowedError extends Error {
  constructor() {
    super('Action not allowed')
  }
}
