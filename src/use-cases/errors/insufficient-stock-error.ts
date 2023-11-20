export class InsufficientStockError extends Error {
  constructor() {
    super('Insufficient stock')
  }
}
