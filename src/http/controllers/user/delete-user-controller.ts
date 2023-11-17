import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteUser } from '@/use-cases/user/factories/make-delete-user'
import { Request, Response } from 'express'

export async function DeleteUserController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deleteUserUseCase = makeDeleteUser()
    await deleteUserUseCase.execute(id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
