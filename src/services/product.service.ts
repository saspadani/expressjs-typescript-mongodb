import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import type ProductType from '../types/product.type'

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch(() => {
      logger.info('cannot get data from DB')
      logger.error(Error)
    })
}

export const getProductById = async (id: string) => {
  return await productModel.findOne({ product_id: id })
}

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}

export const updateProductById = async (id: string, payload: ProductType) => {
  return await productModel.findOneAndUpdate(
    {
      product_id: id
    },
    {
      $set: payload
    }
  )
}
