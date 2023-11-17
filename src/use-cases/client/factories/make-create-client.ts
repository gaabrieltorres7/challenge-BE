import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { PrismaClient } from '@prisma/client'
import { CreateClientUseCase } from '../create-client'

export function makeCreateClient() {
  const prisma = new PrismaClient()
  const clientRepository = new PrismaClientRepository(prisma)

  const useCase = new CreateClientUseCase(clientRepository)

  return useCase
}
