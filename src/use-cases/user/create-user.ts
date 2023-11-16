import { CreateUserDTO, CreatedUserDTO } from '@/repositories/user/dto/user.dto'
import { IUserRepository } from '@/repositories/user/user-interface'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password_hash,
  }: CreateUserDTO): Promise<CreatedUserDTO> {
    const findUserByEmail = await this.userRepository.findByEmail(email)
    if (findUserByEmail) throw new UserAlreadyExistsError()

    const hashedPassword = await hash(password_hash, 6)
    const user = await this.userRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    })

    return user
  }
}
