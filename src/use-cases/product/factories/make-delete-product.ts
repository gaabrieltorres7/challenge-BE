import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteProductUseCase } from '../delete-product'

export function makeDeleteProduct() {
  const prisma = new PrismaClient()
  const productRepository = new PrismaProductRepository(prisma)

  const useCase = new DeleteProductUseCase(productRepository)

  return useCase
}
