import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryClientRepository } from '../../repositories/client/in-memory/in-memory-client-repository'
import { InMemoryOrderRepository } from '../../repositories/order/in-memory/in-memory-order-repository'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { CreateClientUseCase } from '../client/create-client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateUserUseCase } from '../user/create-user'
import { CreateOrderUseCase } from './create-order'

let orderRepository: InMemoryOrderRepository
let clientRepository: InMemoryClientRepository
let userRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let createClientUseCase: CreateClientUseCase
let sut: CreateOrderUseCase

const USER_RINHO = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password_hash: '123456',
}

describe('Create order useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    orderRepository = new InMemoryOrderRepository()
    clientRepository = new InMemoryClientRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    createClientUseCase = new CreateClientUseCase(clientRepository)

    sut = new CreateOrderUseCase(orderRepository, clientRepository)
  })

  it('should be able to create an order', async () => {
    await createUserUseCase.execute(USER_RINHO)
    const client = await createClientUseCase.execute({
      user_id: '1',
      full_name: 'Gabriel',
      contact: '123456789',
      address: 'Rua teste',
    })

    const order = await sut.execute({ client_id: client.id })

    expect(order).toHaveProperty('id')
  })

  it('should not be able to create an order without a client', async () => {
    await expect(sut.execute({ client_id: '1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
