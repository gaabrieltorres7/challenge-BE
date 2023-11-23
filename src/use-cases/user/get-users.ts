import { CreatedUserDTO, GetUsersDTO } from '@/repositories/user/dto/user.dto'
import { IUserRepository } from '@/repositories/user/user-interface'

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    skip = 0,
    take = 10,
  }: GetUsersDTO): Promise<CreatedUserDTO[] | null> {
    const users = await this.userRepository.findAll(skip, take)
    return users
  }
}
