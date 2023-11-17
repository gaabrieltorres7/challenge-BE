import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUser() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new DeleteUserUseCase(userRepository)

  return useCase
}
