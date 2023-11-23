import ClientRoute from '@/http/controllers/client/routes'
import OrderItemRoute from '@/http/controllers/order-item/routes'
import OrderRoute from '@/http/controllers/order/routes'
import ProductRoute from '@/http/controllers/product/routes'
import SalesReportRoute from '@/http/controllers/sales-report/routes'
import UserRoute from '@/http/controllers/user/routes'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { ActionNotAllowedError } from './use-cases/errors/action-not-allowed-error'
import { ConfirmPaymentIfThereAreItemsError } from './use-cases/errors/confirm-payment-if-there-are-items-error'
import { InsufficientStockError } from './use-cases/errors/insufficient-stock-error'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'
import { PaymentNotApprovedError } from './use-cases/errors/payment-not-approved-error'
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
app.use('/orders', OrderRoute)
app.use('/orders-item', OrderItemRoute)
app.use('/sales-reports', SalesReportRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let errorMessage = 'Internal server error'

  if (
    err instanceof UserAlreadyExistsError ||
    err instanceof UserAlreadyAssociatedError ||
    err instanceof ProductAlreadyExistsError
  ) {
    statusCode = 409
  } else if (
    err instanceof InvalidCredentialsError ||
    err instanceof PaymentNotApprovedError ||
    err instanceof InsufficientStockError ||
    err instanceof ConfirmPaymentIfThereAreItemsError
  ) {
    statusCode = 400
  } else if (err instanceof ResourceNotFoundError) {
    statusCode = 404
  } else if (err instanceof ActionNotAllowedError) {
    statusCode = 403
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
