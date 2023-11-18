import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateOrderUseCase } from '../update-order'

export function makeUpdateOrder() {
  const prisma = new PrismaClient()
  const orderRepository = new PrismaOrderRepository(prisma)

  const useCase = new UpdateOrderUseCase(orderRepository)

  return useCase
}
