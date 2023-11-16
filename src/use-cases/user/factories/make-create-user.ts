import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUser() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}
