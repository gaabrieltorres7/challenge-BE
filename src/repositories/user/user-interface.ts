import { CreateUserDTO, CreatedUserDTO, UpdateUserDTO } from './dto/user.dto'

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<CreatedUserDTO>
  findByEmail(email: string): Promise<CreatedUserDTO | null>
  findById(id: string): Promise<CreatedUserDTO | null>
  validateUser(email: string): Promise<CreatedUserDTO | null>
  findAll(skip: number, take: number): Promise<CreatedUserDTO[] | null>
  update(id: string, data: UpdateUserDTO): Promise<CreatedUserDTO | null>
  delete(id: string): Promise<boolean>
}
