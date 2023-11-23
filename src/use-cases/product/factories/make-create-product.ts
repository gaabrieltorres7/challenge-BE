import { PrismaProductRepository } from '@/repositories/product/prisma/prisma-product-repository'
import { PrismaClient } from '@prisma/client'
import { CreateProductUseCase } from '../create-product'

export function makeCreateProduct() {
  const prisma = new PrismaClient()
  const productRepository = new PrismaProductRepository(prisma)

  const useCase = new CreateProductUseCase(productRepository)

  return useCase
}
