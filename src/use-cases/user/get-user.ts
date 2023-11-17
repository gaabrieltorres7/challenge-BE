import { CreatedUserDTO, GetUserDTO } from '@/repositories/user/dto/user.dto'
import { IUserRepository } from '@/repositories/user/user-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: GetUserDTO): Promise<CreatedUserDTO | null> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new ResourceNotFoundError()

    return user
  }
}
