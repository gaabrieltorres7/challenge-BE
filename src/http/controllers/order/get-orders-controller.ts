import { makeGetOrders } from '@/use-cases/order/factories/make-get-orders'
import { Request, Response } from 'express'

export async function GetOrdersController(req: Request, res: Response) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  try {
    const getOrdersUseCase = makeGetOrders()
    const orders = await getOrdersUseCase.execute({ skip, take })

    return res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
