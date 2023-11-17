import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { GetUserUseCase } from '../get-user'

export function makeGetUser() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new GetUserUseCase(userRepository)

  return useCase
}
