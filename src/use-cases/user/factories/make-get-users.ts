import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { GetUsersUseCase } from '../get-users'

export function makeGetUsers() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new GetUsersUseCase(userRepository)

  return useCase
}
