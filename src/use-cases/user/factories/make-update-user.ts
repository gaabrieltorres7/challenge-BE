import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateUserUseCase } from '../update-user'

export function makeUpdateUser() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new UpdateUserUseCase(userRepository)

  return useCase
}
