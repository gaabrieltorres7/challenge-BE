import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateUserUseCase } from './create-user'
import { GetUserUseCase } from './get-user'

let userRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: GetUserUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

describe('Get user useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    sut = new GetUserUseCase(userRepository)
  })

  it('should be able to find an user', async () => {
    const user = await createUserUseCase.execute(USER_RINHO)

    expect(user.email).toEqual('gabriel@teste.com')
  })

  it('should not be able to find an user if it does not exist', async () => {
    await expect(sut.execute('adpaowdpoawnmdopwa')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
