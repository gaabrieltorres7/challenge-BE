import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { ConfirmPaymentIfThereAreItemsError } from '@/use-cases/errors/confirm-payment-if-there-are-items-error'
import { InsufficientStockError } from '@/use-cases/errors/insufficient-stock-error'
import { PaymentNotApprovedError } from '@/use-cases/errors/payment-not-approved-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeConfirmPayment } from '@/use-cases/order/factories/make-confirm-payment'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export async function ConfirmPaymentController(req: Request, res: Response) {
  const { order_id } = req.params

  try {
    const prisma = new PrismaClient()
    const orderRepository = new PrismaOrderRepository(prisma)
    const clientRepository = new PrismaClientRepository(prisma)

    const order = await orderRepository.findById(order_id)
    if (order) {
      const client = await clientRepository.findById(order.client_id)

      if (req.user.type === 'CLIENT' && client?.user_id !== req.user.id) {
        return res.status(401).json({
          message: 'You can only confirm your own orders',
        })
      }
    }

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
    } else if (error instanceof ConfirmPaymentIfThereAreItemsError) {
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
