import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaClient } from '@prisma/client'
import { GetOrdersItemUseCase } from '../get-order-items'

export function makeGetOrdersItem() {
  const prisma = new PrismaClient()
  const ordersItemRepository = new PrismaOrderItemRepository(prisma)

  const useCase = new GetOrdersItemUseCase(ordersItemRepository)

  return useCase
}
