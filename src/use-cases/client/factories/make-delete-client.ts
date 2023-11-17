import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteClientUseCase } from '../delete-client'

export function makeDeleteClient() {
  const prisma = new PrismaClient()
  const clientRepository = new PrismaClientRepository(prisma)

  const useCase = new DeleteClientUseCase(clientRepository)

  return useCase
}
