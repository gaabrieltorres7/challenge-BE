import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteOrderUseCase } from '../delete-order'

export function makeDeleteOrder() {
  const prisma = new PrismaClient()
  const orderRepository = new PrismaOrderRepository(prisma)

  const useCase = new DeleteOrderUseCase(orderRepository)

  return useCase
}
