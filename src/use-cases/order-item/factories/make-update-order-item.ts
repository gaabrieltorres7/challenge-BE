import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateOrderItemUseCase } from '../update-order-item'

export function makeUpdateOrderItem() {
  const prisma = new PrismaClient()
  const orderItemRepository = new PrismaOrderItemRepository(prisma)

  const useCase = new UpdateOrderItemUseCase(orderItemRepository)

  return useCase
}
