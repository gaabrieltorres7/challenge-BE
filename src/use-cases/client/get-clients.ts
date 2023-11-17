import { IClientRepository } from '@/repositories/client/client-interface'
import {
  CreatedClientDTO,
  GetClientsDTO,
} from '@/repositories/client/dto/client.dto'

export class GetClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({
    skip = 0,
    take = 10,
  }: GetClientsDTO): Promise<CreatedClientDTO[] | null> {
    const clients = await this.clientRepository.findAll(skip, take)
    return clients
  }
}
