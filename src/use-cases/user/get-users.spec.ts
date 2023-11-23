import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { GetUsersUseCase } from './get-users'

let userRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: GetUsersUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

const USER_DINHO = {
  name: 'luca',
  email: 'luca@teste.com',
  password_hash: '123456',
}

describe('Get users useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    sut = new GetUsersUseCase(userRepository)
  })

  it('should be able to find users', async () => {
    await createUserUseCase.execute(USER_RINHO)
    await createUserUseCase.execute(USER_DINHO)

    const users = await sut.execute({})

    expect(users).toHaveLength(2)
  })

  it('should not be able to find users if there are not in there', async () => {
    const users = await sut.execute({})
    expect(users).toHaveLength(0)
  })

  it('should be able to find users with pagination', async () => {
    await createUserUseCase.execute(USER_RINHO)
    await createUserUseCase.execute(USER_DINHO)

    const users = await sut.execute({ skip: 1, take: 2 })

    expect(users).toHaveLength(1)
  })
})
