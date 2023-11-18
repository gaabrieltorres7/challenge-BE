import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteOrderItemUseCase } from '../delete-order-item'

export function makeDeleteOrderItem() {
  const prisma = new PrismaClient()
  const orderItemRepository = new PrismaOrderItemRepository(prisma)

  const useCase = new DeleteOrderItemUseCase(orderItemRepository)

  return useCase
}
