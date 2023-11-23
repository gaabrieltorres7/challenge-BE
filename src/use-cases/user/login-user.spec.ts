import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { CreateUserUseCase } from './create-user'
import { LoginUserUseCase } from './login-user'

let userRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: LoginUserUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

describe('Login user useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    sut = new LoginUserUseCase(userRepository)
  })

  it('should be able to login', async () => {
    await createUserUseCase.execute(USER_RINHO)

    const users = await sut.execute({
      email: USER_RINHO.email,
      password: USER_RINHO.password_hash,
    })

    expect(users).toHaveProperty('id')
  })

  it('should not be able to login with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: USER_RINHO.email,
        password: USER_RINHO.password_hash,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to login with wrong password', async () => {
    await createUserUseCase.execute({
      email: USER_RINHO.email,
      name: USER_RINHO.name,
      password_hash: await hash(USER_RINHO.password_hash, 6),
    })

    await expect(() =>
      sut.execute({
        email: USER_RINHO.email,
        password: 'invalid_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
