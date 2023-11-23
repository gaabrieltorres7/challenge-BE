import { makeDeleteClient } from '@/use-cases/client/factories/make-delete-client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'

export async function DeleteClientController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deleteClientUseCase = makeDeleteClient()
    await deleteClientUseCase.execute(id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
