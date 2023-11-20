import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteOrderItemUseCase } from '../delete-order-item'

export function makeDeleteOrderItem() {
  const prisma = new PrismaClient()
  const orderItemRepository = new PrismaOrderItemRepository(prisma)
  const orderRepository = new PrismaOrderRepository(prisma)

  const useCase = new DeleteOrderItemUseCase(
    orderItemRepository,
    orderRepository,
  )

  return useCase
}
