import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaClient } from '@prisma/client'
import { GetOrdersUseCase } from '../get-orders'

export function makeGetOrders() {
  const prisma = new PrismaClient()
  const orderRepository = new PrismaOrderRepository(prisma)

  const useCase = new GetOrdersUseCase(orderRepository)

  return useCase
}
