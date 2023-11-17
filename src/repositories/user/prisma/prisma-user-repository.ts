import { PrismaClient } from '@prisma/client'
import { CreateUserDTO, CreatedUserDTO, UpdateUserDTO } from '../dto/user.dto'
import { IUserRepository } from '../user-interface'

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const user = await this.prisma.user.create({ data })
    return user
  }

  async findByEmail(email: string): Promise<CreatedUserDTO | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user
  }

  async findById(id: string): Promise<CreatedUserDTO | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user
  }

  async validateUser(email: string): Promise<CreatedUserDTO | null> {
    const user = await this.prisma.user.update({
      where: { email },
      data: { is_confirmed: true },
    })
    return user
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<CreatedUserDTO[] | null> {
    const users = await this.prisma.user.findMany({
      skip: skip || 0,
      take: take || 10,
    })
    return users
  }

  async update(
    id: string,
    data: UpdateUserDTO,
  ): Promise<CreatedUserDTO | null> {
    const user = await this.prisma.user.update({ where: { id }, data })
    return user
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } })
    return true
  }
}
