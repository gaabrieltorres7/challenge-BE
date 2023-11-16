import { CreateUserDTO, CreatedUserDTO } from './dto/user.dto'

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<CreatedUserDTO>
  findByEmail(email: string): Promise<CreatedUserDTO | null>
  findById(id: string): Promise<CreatedUserDTO | null>
  validateUser(email: string): Promise<CreatedUserDTO | null>
}
