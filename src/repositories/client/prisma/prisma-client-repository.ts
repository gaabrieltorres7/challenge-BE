import { PrismaClient } from '@prisma/client'
import { IClientRepository } from '../client-interface'
import {
  CreateClientDTO,
  CreatedClientDTO,
  UpdateClientDTO,
} from '../dto/client.dto'

export class PrismaClientRepository implements IClientRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateClientDTO): Promise<CreatedClientDTO> {
    const client = await this.prisma.client.create({ data })
    return client
  }

  // async findByEmail(email: string): Promise<CreatedClientDTO | null> {
  //   const client = await this.prisma.client.findUnique({
  //     where: { contact: email },
  //   })
  //   return client
  // }

  async findById(id: string): Promise<CreatedClientDTO | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: { user: true, orders: true },
    })
    return client
  }

  async findByUserId(user_id: string): Promise<CreatedClientDTO | null> {
    const client = await this.prisma.client.findUnique({
      where: { user_id },
      include: { user: true, orders: true },
    })
    return client
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<CreatedClientDTO[] | null> {
    const clients = await this.prisma.client.findMany({
      skip: skip || 0,
      take: take || 10,
      include: { user: true, orders: true },
    })
    return clients
  }

  async update(
    id: string,
    data: UpdateClientDTO,
  ): Promise<CreatedClientDTO | null> {
    const client = await this.prisma.client.update({ where: { id }, data })
    return client
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.client.delete({ where: { id } })
    return true
  }
}
