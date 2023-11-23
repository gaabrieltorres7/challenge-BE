export class ProductAlreadyExistsError extends Error {
  constructor() {
    super('Name already exists')
  }
}
