import { CreatedUserDTO, UpdateUserDTO } from '@/repositories/user/dto/user.dto'
import { IUserRepository } from '@/repositories/user/user-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
    data: UpdateUserDTO,
  ): Promise<CreatedUserDTO | null> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new ResourceNotFoundError()

    const updatedUser = await this.userRepository.update(id, data)

    return updatedUser
  }
}
