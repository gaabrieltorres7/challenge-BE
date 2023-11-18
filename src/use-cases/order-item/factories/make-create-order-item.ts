import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaClient } from '@prisma/client'
import { CreateOrderItemUseCase } from '../create-order-item'

export function makeCreateOrderItem() {
  const prisma = new PrismaClient()
  const orderItemRepository = new PrismaOrderItemRepository(prisma)

  const useCase = new CreateOrderItemUseCase(orderItemRepository)

  return useCase
}
