import { makeGetOrdersItem } from '@/use-cases/order-item/factories/make-get-orders-item'
import { Request, Response } from 'express'

export async function GetOrdersItemController(req: Request, res: Response) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  try {
    const getOrdersItemUseCase = makeGetOrdersItem()
    const ordersItem = await getOrdersItemUseCase.execute({ skip, take })

    return res.status(200).json(ordersItem)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
