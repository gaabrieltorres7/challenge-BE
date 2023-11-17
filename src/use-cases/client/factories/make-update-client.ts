import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateClientUseCase } from '../update-client'

export function makeUpdateClient() {
  const prisma = new PrismaClient()
  const clientRepository = new PrismaClientRepository(prisma)

  const useCase = new UpdateClientUseCase(clientRepository)

  return useCase
}
