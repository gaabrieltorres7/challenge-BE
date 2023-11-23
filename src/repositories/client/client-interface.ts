import {
  CreateClientDTO,
  CreatedClientDTO,
  UpdateClientDTO,
} from './dto/client.dto'

export interface IClientRepository {
  create(data: CreateClientDTO): Promise<CreatedClientDTO>
  // findByEmail(email: string): Promise<CreatedClientDTO | null>
  findById(id: string): Promise<CreatedClientDTO | null>
  findByUserId(user_id: string): Promise<CreatedClientDTO | null>
  findAll(skip: number, take: number): Promise<CreatedClientDTO[] | null>
  update(id: string, data: UpdateClientDTO): Promise<CreatedClientDTO | null>
  delete(id: string): Promise<boolean>
}
