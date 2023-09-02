import { type Request, type Response } from 'express'
import { createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { hashing } from '../utils/hashing'
import { createUser } from '../services/auth.service'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.error('ERR: auth - register = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    value.password = `${hashing(value.password)}`

    await createUser(value)
    return res.status(201).json({ status: true, statusCode: 201, message: 'Register User Success' })
  } catch (error) {
    logger.error('ERR: auth - register = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
