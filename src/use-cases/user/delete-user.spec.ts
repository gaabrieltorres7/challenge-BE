import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateUserUseCase } from './create-user'
import { DeleteUserUseCase } from './delete-user'

let userRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: DeleteUserUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

describe('Delete user useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    sut = new DeleteUserUseCase(userRepository)
  })

  it('should be able to delete an user', async () => {
    const user = await createUserUseCase.execute(USER_RINHO)

    expect(await sut.execute(user.id)).toBeTruthy()
  })

  it('should not be able to delete an user if it does not exist', async () => {
    await expect(sut.execute('testeID')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
