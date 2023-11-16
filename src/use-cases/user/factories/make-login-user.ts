import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { LoginUserUseCase } from '../login-user'

export function makeLoginUser() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new LoginUserUseCase(userRepository)

  return useCase
}
