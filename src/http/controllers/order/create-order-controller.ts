import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { makeCreateOrder } from '@/use-cases/order/factories/make-create-order'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export async function CreateOrderController(req: Request, res: Response) {
  const user_id = req.user.id

  try {
    const prisma = new PrismaClient()
    const clientRepo = new PrismaClientRepository(prisma)
    const client = await clientRepo.findByUserId(user_id)

    if (!client) {
      return res
        .status(404)
        .json({ message: 'You must create a client before creating an order' })
    }

    const createOrder = makeCreateOrder()
    await createOrder.execute({ client_id: client.id })
  } catch (error) {
    return res.status(500).send()
  }

  return res.status(201).json({
    message: 'Order has been created successfully',
  })
}
