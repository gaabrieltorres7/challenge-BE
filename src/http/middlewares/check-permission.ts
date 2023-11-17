import { NextFunction, Request, Response } from 'express'

export function checkPermission(allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.user

    if (!allowedTypes.includes(type)) {
      return res
        .status(401)
        .json({ message: 'Your user type has no permission to do this.' })
    }

    next()
  }
}
