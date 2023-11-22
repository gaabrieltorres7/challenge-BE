import { PrismaClient } from '@prisma/client'
import {
  CreateProductDTO,
  CreatedProductDTO,
  UpdateProductDTO,
} from '../dto/product.dto'
import { IProductRepository } from '../product-interface'

export class PrismaProductRepository implements IProductRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateProductDTO): Promise<CreatedProductDTO> {
    const product = await this.prisma.product.create({ data })
    return product
  }

  async findById(id: string): Promise<CreatedProductDTO | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { OrderItem: true },
    })
    return product
  }

  async findByName(name: string): Promise<CreatedProductDTO | null> {
    const product = await this.prisma.product.findFirst({
      where: { name },
      include: { OrderItem: true },
    })
    return product
  }

  async findAll(query: string): Promise<CreatedProductDTO[] | null> {
    if (!query) return await this.prisma.product.findMany({})

    const lowerCaseQuery = query.toLowerCase()
    const parsedQuery = parseFloat(lowerCaseQuery)

    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: lowerCaseQuery,
            },
          },
          {
            description: {
              contains: lowerCaseQuery,
            },
          },
          {
            price: {
              equals: isNaN(parsedQuery) ? undefined : parsedQuery,
            },
          },
          {
            stock_quantity: {
              equals: isNaN(parsedQuery) ? undefined : parseInt(lowerCaseQuery),
            },
          },
        ],
      },
      include: { OrderItem: true },
    })
    return products
  }

  async update(
    id: string,
    data: UpdateProductDTO,
  ): Promise<CreatedProductDTO | null> {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    })
    return product
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.product.delete({ where: { id } })
    return true
  }

  async debitStock(id: string, quantity: number): Promise<boolean> {
    await this.prisma.product.update({
      where: { id },
      data: {
        stock_quantity: quantity,
      },
    })
    return true
  }
}
