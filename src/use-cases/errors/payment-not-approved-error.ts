export class PaymentNotApprovedError extends Error {
  constructor() {
    super('Payment not approved')
  }
}
