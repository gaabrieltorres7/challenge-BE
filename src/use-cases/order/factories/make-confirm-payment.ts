import { PrismaOrderItemRepository } from '@/repositories/order-item/prisma/prisma-order-item-repository'
import { PrismaOrderRepository } from '@/repositories/order/prisma/prisma-order-repository'
import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { ConfirmPaymentUseCase } from '../confirm-payment'

export function makeConfirmPayment() {
  const prisma = new PrismaClient()
  const productRepository = new PrismaProductRepository(prisma)
  const orderRepository = new PrismaOrderRepository(prisma)
  const orderItemRepository = new PrismaOrderItemRepository(prisma)

  const useCase = new ConfirmPaymentUseCase(
    productRepository,
    orderRepository,
    orderItemRepository,
  )

  return useCase
}
