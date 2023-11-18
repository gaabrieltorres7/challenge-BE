import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateProductUseCase } from '../update-product'

export function makeUpdateProduct() {
  const prisma = new PrismaClient()
  const productRepository = new PrismaProductRepository(prisma)

  const useCase = new UpdateProductUseCase(productRepository)

  return useCase
}
