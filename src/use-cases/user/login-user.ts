import { CreatedUserDTO, UserLoginDTO } from '@/repositories/user/dto/user.dto'
import { IUserRepository } from '@/repositories/user/user-interface'
import { compare } from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: UserLoginDTO): Promise<CreatedUserDTO> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}
