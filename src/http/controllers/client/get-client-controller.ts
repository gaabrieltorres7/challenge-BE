import { makeGetClient } from '@/use-cases/client/factories/make-get-client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'

export async function GetClientController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const getClientUseCase = makeGetClient()
    const client = await getClientUseCase.execute({ id })
    return res.status(200).json(client)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
