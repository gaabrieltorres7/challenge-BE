import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { GetProductUseCase } from '../get-product'

export function makeGetProduct() {
  const prisma = new PrismaClient()
  const productRepository = new PrismaProductRepository(prisma)

  const useCase = new GetProductUseCase(productRepository)

  return useCase
}
