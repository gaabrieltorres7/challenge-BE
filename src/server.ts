import ClientRoute from '@/http/controllers/client/routes'
import ProductRoute from '@/http/controllers/product/routes'
import UserRoute from '@/http/controllers/user/routes'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'
import { ProductAlreadyExistsError } from './use-cases/errors/product-already-exists-error'
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found-error'
import { UserAlreadyAssociatedError } from './use-cases/errors/user-already-associated-error'
import { UserAlreadyExistsError } from './use-cases/errors/user-already-exists-error'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/users', UserRoute)
app.use('/clients', ClientRoute)
app.use('/products', ProductRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let errorMessage = 'Internal server error'

  if (
    err instanceof UserAlreadyExistsError ||
    err instanceof UserAlreadyAssociatedError ||
    err instanceof ProductAlreadyExistsError
  ) {
    statusCode = 409
  } else if (err instanceof InvalidCredentialsError) {
    statusCode = 400
  } else if (err instanceof ResourceNotFoundError) {
    statusCode = 404
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
