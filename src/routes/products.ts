import { type Request, type Response, type NextFunction, Router } from 'express'
import { logger } from '../utils/logger'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('get product data success')
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Sepatu Sport', price: 500000 }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('post new product data success')
  res.status(200).send({ status: true, statusCode: 200, data: req.body })
})
