export class ConfirmPaymentIfThereAreItemsError extends Error {
  constructor() {
    super('You can only confirm a payment for an order with items in it')
  }
}
