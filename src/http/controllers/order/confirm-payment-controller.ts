import { InsufficientStockError } from '@/use-cases/errors/insufficient-stock-error'
import { PaymentNotApprovedError } from '@/use-cases/errors/payment-not-approved-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeConfirmPayment } from '@/use-cases/order/factories/make-confirm-payment'
import { Request, Response } from 'express'

export async function ConfirmPaymentController(req: Request, res: Response) {
  const { order_id } = req.params

  try {
    const confirmPaymentUseCase = makeConfirmPayment()
    await confirmPaymentUseCase.execute(order_id)
  } catch (error) {
    console.log(error)
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        message: error.message,
      })
    } else if (error instanceof InsufficientStockError) {
      return res.status(400).json({
        message: error.message,
      })
    } else if (error instanceof PaymentNotApprovedError) {
      return res.status(400).json({
        message: error.message,
      })
    }
    return res.status(500).send()
  }

  return res.status(200).json({
    message: 'Payment confirmed',
  })
}
