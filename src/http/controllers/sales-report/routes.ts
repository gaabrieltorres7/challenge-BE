import { Authentication } from '@/http/middlewares/auth'
// import { checkPermission } from '@/http/middlewares/check-permission'
import {
  CreateSalesReportController,
  DeleteSalesReportController,
  GetSalesReportController,
  GetSalesReportsController,
  UpdateSalesReportController,
} from '@/http/controllers/sales-report'
import { Router } from 'express'

export const router = Router()

router.use(Authentication)

router.get('/', (req, res) => GetSalesReportsController(req, res))

// router.use(checkPermission(['ADMIN']))

router.post('/create', (req, res) => CreateSalesReportController(req, res))
router.get('/:id', (req, res) => GetSalesReportController(req, res))
router.put('/update/:id', (req, res) => UpdateSalesReportController(req, res))
router.delete('/delete/:id', (req, res) =>
  DeleteSalesReportController(req, res),
)

export default router
