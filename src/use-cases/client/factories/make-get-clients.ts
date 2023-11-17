import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { PrismaClient } from '@prisma/client'
import { GetClientsUseCase } from '../get-clients'

export function makeGetClients() {
  const prisma = new PrismaClient()
  const clientRepository = new PrismaClientRepository(prisma)

  const useCase = new GetClientsUseCase(clientRepository)

  return useCase
}
