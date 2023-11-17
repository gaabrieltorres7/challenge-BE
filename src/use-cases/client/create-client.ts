import { IClientRepository } from '@/repositories/client/client-interface'
import {
  CreateClientDTO,
  CreatedClientDTO,
} from '@/repositories/client/dto/client.dto'
import { UserAlreadyAssociatedError } from '../errors/user-already-associated-error'

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute({
    full_name,
    address,
    contact,
    user_id,
  }: CreateClientDTO): Promise<CreatedClientDTO> {
    const findClientById = await this.clientRepository.findByUserId(user_id)
    if (findClientById) throw new UserAlreadyAssociatedError()

    const client = await this.clientRepository.create({
      full_name,
      address,
      contact,
      user_id,
    })

    return client
  }
}
