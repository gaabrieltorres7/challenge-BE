import { makeGetUsers } from '@/use-cases/user/factories/make-get-users'
import { Request, Response } from 'express'

export async function GetUsersController(req: Request, res: Response) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  try {
    const getUsersUseCase = makeGetUsers()
    const users = await getUsersUseCase.execute({ skip, take })

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
