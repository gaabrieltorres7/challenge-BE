import { IClientRepository } from '@/repositories/client/client-interface'
import {
  CreatedClientDTO,
  UpdateClientDTO,
} from '@/repositories/client/dto/client.dto'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(
    id: string,
    data: UpdateClientDTO,
  ): Promise<CreatedClientDTO | null> {
    const client = await this.clientRepository.findById(id)

    if (!client) throw new ResourceNotFoundError()

    const updatedClient = await this.clientRepository.update(id, data)

    return updatedClient
  }
}
