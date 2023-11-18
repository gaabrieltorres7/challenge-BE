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
    const product = await this.prisma.product.findUnique({ where: { id } })
    return product
  }

  async findByName(name: string): Promise<CreatedProductDTO | null> {
    const product = await this.prisma.product.findFirst({ where: { name } })
    return product
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<CreatedProductDTO[] | null> {
    const products = await this.prisma.product.findMany({
      skip: skip || 0,
      take: take || 10,
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
}
