import { IClientRepository } from '@/repositories/client/client-interface'
import {
  CreatedClientDTO,
  GetClientDTO,
} from '@/repositories/client/dto/client.dto'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ id }: GetClientDTO): Promise<CreatedClientDTO | null> {
    const client = await this.clientRepository.findById(id)

    if (!client) throw new ResourceNotFoundError()

    return client
  }
}
