import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export type jwtPayload = {
  id: string
  email: string
  type: 'ADMIN' | 'CLIENT'
}

export function Authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  try {
    const [, token] = authorization.split(' ')
    const { id, email, type } = jwt.verify(
      token,
      process.env.JWT_SECRET ?? '',
    ) as jwtPayload

    const prisma = new PrismaClient()
    const userRepository = new PrismaUserRepository(prisma)
    const user = userRepository.findById(id)

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = {
      id,
      email,
      type,
    }

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
