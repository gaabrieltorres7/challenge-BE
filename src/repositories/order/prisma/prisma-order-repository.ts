import { PrismaClient } from '@prisma/client'
import {
  CreateOrderDTO,
  CreatedOrderDTO,
  UpdateOrderDTO,
} from '../dto/order.dto'
import { IOrderRepository } from '../order-interface'

export class PrismaOrderRepository implements IOrderRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateOrderDTO): Promise<CreatedOrderDTO> {
    const order = await this.prisma.order.create({ data })
    return order
  }

  async findById(id: string): Promise<CreatedOrderDTO | null> {
    const order = await this.prisma.order.findUnique({ where: { id } })
    return order
  }

  async findByClientId(client_id: string): Promise<CreatedOrderDTO[] | null> {
    const orders = await this.prisma.order.findMany({ where: { client_id } })
    return orders
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<CreatedOrderDTO[] | null> {
    const orders = await this.prisma.order.findMany({
      skip: skip || 0,
      take: take || 10,
    })
    return orders
  }

  async update(
    id: string,
    data: UpdateOrderDTO,
  ): Promise<CreatedOrderDTO | null> {
    const order = await this.prisma.order.update({ where: { id }, data })
    return order
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.order.delete({ where: { id } })
    return true
  }
}
