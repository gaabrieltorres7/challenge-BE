import { IClientRepository } from '@/repositories/client/client-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string): Promise<boolean> {
    const user = await this.clientRepository.findById(id)

    if (!user) throw new ResourceNotFoundError()

    await this.clientRepository.delete(id)

    return true
  }
}
