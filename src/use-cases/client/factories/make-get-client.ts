import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { PrismaClient } from '@prisma/client'
import { GetClientUseCase } from '../get-client'

export function makeGetClient() {
  const prisma = new PrismaClient()
  const clientRepository = new PrismaClientRepository(prisma)

  const useCase = new GetClientUseCase(clientRepository)

  return useCase
}
