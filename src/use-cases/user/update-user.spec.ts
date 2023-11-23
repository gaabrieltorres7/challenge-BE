import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateUserUseCase } from './create-user'
import { UpdateUserUseCase } from './update-user'

let userRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: UpdateUserUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

describe('Update user useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    sut = new UpdateUserUseCase(userRepository)
  })

  it('should be able to update an user', async () => {
    const user = await createUserUseCase.execute(USER_RINHO)

    const updatedUser = await sut.execute(user.id, { name: 'Gabriel' })

    expect(updatedUser).toHaveProperty('id')
    expect(updatedUser?.name).toBe('Gabriel')
  })

  it('should not be able to update if there is not an user', async () => {
    await expect(() =>
      sut.execute('aoindaiowndioandw', { name: 'Gabriel' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
