import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUser } from '@/use-cases/user/factories/make-get-user'
import { Request, Response } from 'express'

export async function GetUserController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const getUserUseCase = makeGetUser()
    const user = await getUserUseCase.execute({ id })
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
