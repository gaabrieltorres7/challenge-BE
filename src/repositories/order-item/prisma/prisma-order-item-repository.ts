import { PrismaClient } from '@prisma/client'
import {
  CreateOrderItemDTO,
  CreatedOrderItemDTO,
  UpdateOrderItemDTO,
} from '../dto/order-item.dto'
import { IOrderItemRepository } from '../order-item-interface'

export class PrismaOrderItemRepository implements IOrderItemRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateOrderItemDTO): Promise<CreatedOrderItemDTO> {
    const orderItem = await this.prisma.orderItem.create({ data })
    return orderItem
  }

  async findById(id: string): Promise<CreatedOrderItemDTO | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
      include: { order: true, product: true },
    })
    return orderItem
  }

  async findByOrderId(order_id: string): Promise<CreatedOrderItemDTO[] | null> {
    const orderItems = await this.prisma.orderItem.findMany({
      where: { order_id },
      include: { order: true, product: true },
    })
    return orderItems
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<CreatedOrderItemDTO[] | null> {
    const orderItems = await this.prisma.orderItem.findMany({
      skip: skip || 0,
      take: take || 10,
      include: { order: true, product: true },
    })
    return orderItems
  }

  async update(
    id: string,
    data: UpdateOrderItemDTO,
  ): Promise<CreatedOrderItemDTO | null> {
    const orderItem = await this.prisma.orderItem.update({
      where: { id },
      data,
    })
    return orderItem
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.orderItem.delete({ where: { id } })
    return true
  }
}
