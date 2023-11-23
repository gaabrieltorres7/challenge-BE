import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { CreateUserUseCase } from './create-user'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

describe('Create user useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create an user', async () => {
    const user = await sut.execute(USER_RINHO)

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create an user with same email', async () => {
    await sut.execute(USER_RINHO)

    await expect(sut.execute(USER_RINHO)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
