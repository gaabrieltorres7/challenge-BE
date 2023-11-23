import { IClientRepository } from '../client-interface'
import {
  CreateClientDTO,
  CreatedClientDTO,
  UpdateClientDTO,
} from '../dto/client.dto'

export class InMemoryClientRepository implements IClientRepository {
  public items: CreatedClientDTO[] = []

  // export type CreateClientDTO = {
  //   user_id: string
  //   full_name: string
  //   contact: string
  //   address: string
  // }

  // export type CreatedClientDTO = {
  //   id: string
  //   status: boolean
  //   created_at: Date
  //   updated_at: Date
  //   user?: CreatedUserDTO
  //   orders?: CreatedOrderDTO[]
  // } & CreateClientDTO

  async create(data: CreateClientDTO): Promise<CreatedClientDTO> {
    const client = {
      id: '1',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
      full_name: data.full_name,
      contact: data.contact,
      address: data.address,
      orders: [],
      user: {},
    }

    this.items.push(client)

    return client
  }

  async findById(id: string): Promise<CreatedClientDTO | null> {
    const client = this.items.find((item) => item.id === id)

    return client || null
  }

  async findByUserId(user_id: string): Promise<CreatedClientDTO | null> {
    const client = this.items.find((item) => item.user_id === user_id)

    return client || null
  }

  async findAll(
    skip: number,
    take: number,
  ): Promise<CreatedClientDTO[] | null> {
    const client = this.items.slice(skip, take)

    return client || null
  }

  async update(
    id: string,
    data: UpdateClientDTO,
  ): Promise<CreatedClientDTO | null> {
    const client = this.items.find((item) => item.id === id)

    if (!client) {
      return null
    }

    Object.assign(client, data)

    return client
  }

  async delete(id: string): Promise<boolean> {
    const client = this.items.find((item) => item.id === id)

    if (!client) {
      return false
    }

    this.items.splice(this.items.indexOf(client), 1)

    return true
  }
}
