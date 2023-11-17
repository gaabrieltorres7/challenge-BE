import { IUserRepository } from '@/repositories/user/user-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new ResourceNotFoundError()

    await this.userRepository.delete(id)

    return true
  }
}
