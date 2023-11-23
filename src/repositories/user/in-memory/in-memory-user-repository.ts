import { randomUUID } from 'crypto'
import { CreateUserDTO, CreatedUserDTO, UpdateUserDTO } from '../dto/user.dto'
import { IUserRepository } from '../user-interface'

export class InMemoryUserRepository implements IUserRepository {
  public items: CreatedUserDTO[] = []

  async create(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      is_confirmed: false,
      type: 'CLIENT',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<CreatedUserDTO | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<CreatedUserDTO | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async validateUser(email: string): Promise<CreatedUserDTO | null> {
    throw new Error('Method not implemented.')
  }

  async findAll(skip: number, take: number): Promise<CreatedUserDTO[] | null> {
    const users = this.items.slice(skip, take)

    if (!users) {
      return null
    }

    return users
  }

  async update(
    id: string,
    data: UpdateUserDTO,
  ): Promise<CreatedUserDTO | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    const updatedUser = {
      ...user,
      ...data,
    }

    this.items = this.items.map((user) => (user.id === id ? updatedUser : user))

    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return false
    }

    this.items = this.items.filter((user) => user.id !== id)

    return true
  }
}
