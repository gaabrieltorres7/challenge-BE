import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaClient } from '@prisma/client'
import { CreateOrderUseCase } from '../create-order'

export function makeCreateOrder() {
  const prisma = new PrismaClient()
  const orderRepository = new PrismaOrderRepository(prisma)

  const useCase = new CreateOrderUseCase(orderRepository)

  return useCase
}
