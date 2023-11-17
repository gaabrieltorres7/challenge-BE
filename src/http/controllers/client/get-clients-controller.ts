import { makeGetClients } from '@/use-cases/client/factories/make-get-clients'
import { Request, Response } from 'express'

export async function GetClientsController(req: Request, res: Response) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  try {
    const getClientsUseCase = makeGetClients()
    const clients = await getClientsUseCase.execute({ skip, take })

    return res.status(200).json(clients)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
