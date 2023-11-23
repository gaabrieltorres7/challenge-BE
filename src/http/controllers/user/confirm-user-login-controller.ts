import { PrismaUserRepository } from '@/repositories/user/prisma/prisma-user-repository'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function ConfirmUserLoginController(req: Request, res: Response) {
  if (req.query.token) {
    const token = String(req.query.token)
    jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'jwtUltraSecretoNinguemDescobre',
      async (err, decoded: any) => {
        if (err) {
          return res.status(498).json({
            message: 'Invalid token expired.',
            code: 'INVALID_TOKEN_ACTIVE',
          })
        }

        const prisma = new PrismaClient()
        const user = new PrismaUserRepository(prisma)

        await user.validateUser(decoded.email)

        return res.status(200).json({
          message: 'Account has been activated successfully',
        })
      },
    )
  } else {
    return res.status(498).json({
      message: 'Invalid token.',
      code: 'INVALID_TOKEN',
    })
  }
}
