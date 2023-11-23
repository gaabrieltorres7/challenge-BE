import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrder } from '@/use-cases/order/factories/make-get-order'
import { Request, Response } from 'express'

export async function GetOrderController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const getOrderUseCase = makeGetOrder()
    const order = await getOrderUseCase.execute({ id })
    return res.status(200).json(order)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
