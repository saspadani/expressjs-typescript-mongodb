import mongoose from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch(() => {
    logger.info('Could not connect to MongoDB')
    logger.error(Error)
    process.exit(1)
  })
