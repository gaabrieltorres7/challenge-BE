import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { CreateOrderItemUseCase } from '../create-order-item'

export function makeCreateOrderItem() {
  const prisma = new PrismaClient()
  const orderItemRepository = new PrismaOrderItemRepository(prisma)
  const orderRepository = new PrismaOrderRepository(prisma)
  const productRepository = new PrismaProductRepository(prisma)

  const useCase = new CreateOrderItemUseCase(
    orderItemRepository,
    orderRepository,
    productRepository,
  )

  return useCase
}
