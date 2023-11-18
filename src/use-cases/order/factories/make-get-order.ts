import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaClient } from '@prisma/client'
import { GetOrderUseCase } from '../get-order'

export function makeGetOrder() {
  const prisma = new PrismaClient()
  const orderRepository = new PrismaOrderRepository(prisma)

  const useCase = new GetOrderUseCase(orderRepository)

  return useCase
}
