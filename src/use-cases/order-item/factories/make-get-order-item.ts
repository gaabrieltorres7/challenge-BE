import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaClient } from '@prisma/client'
import { GetOrderItemUseCase } from '../get-order-item'

export function makeGetOrderItem() {
  const prisma = new PrismaClient()
  const orderItemRepository = new PrismaOrderItemRepository(prisma)

  const useCase = new GetOrderItemUseCase(orderItemRepository)

  return useCase
}
