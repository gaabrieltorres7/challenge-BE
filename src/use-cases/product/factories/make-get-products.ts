import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { GetProductsUseCase } from '../get-products'

export function makeGetProducts() {
  const prisma = new PrismaClient()
  const productRepository = new PrismaProductRepository(prisma)

  const useCase = new GetProductsUseCase(productRepository)

  return useCase
}
