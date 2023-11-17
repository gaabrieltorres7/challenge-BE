import { IClientRepository } from '@/repositories/client/client-interface'
import {
  CreatedClientDTO,
  GetClientDTO,
} from '@/repositories/client/dto/client.dto'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ id }: GetClientDTO): Promise<CreatedClientDTO | null> {
    const user = await this.clientRepository.findById(id)

    if (!user) throw new ResourceNotFoundError()

    return user
  }
}
