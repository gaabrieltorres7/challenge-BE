import { IClientRepository } from '@/repositories/client/client-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string): Promise<boolean> {
    const client = await this.clientRepository.findById(id)

    if (!client) throw new ResourceNotFoundError()

    await this.clientRepository.delete(id)

    return true
  }
}
