import { makeGetOrders } from '@/use-cases/order/factories/make-get-orders'
import { Request, Response } from 'express'

export async function GetOrdersController(req: Request, res: Response) {
  const { startDate, endDate } = req.query
  const start = String(startDate)
  const end = String(endDate)

  try {
    const getOrdersUseCase = makeGetOrders()
    const orders = await getOrdersUseCase.execute({
      startDate: start,
      endDate: end,
    })
    return res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
