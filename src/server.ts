import UserRoute from '@/http/controllers/user/routes'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'
import { UserAlreadyExistsError } from './use-cases/errors/user-already-exists-error'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/users', UserRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let errorMessage = 'Internal server error'

  if (err instanceof UserAlreadyExistsError) {
    statusCode = 409
  } else if (err instanceof InvalidCredentialsError) {
    statusCode = 400
  }
  if (statusCode !== 500) {
    errorMessage = err.message
  }

  console.log(err)
  return res.status(statusCode).json({ message: errorMessage })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
