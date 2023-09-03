import { type Request, type Response } from 'express'
import { createSessionValidation, createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, findUserByEmail } from '../services/auth.service'
// import type UserType from '../types/user.type'
import { signJWT } from '../utils/jwt'

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

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.error('ERR: auth - create session = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const user: any = await findUserByEmail(value.email)
    const isValid = checkPassword(value.password, user.password)

    if (!isValid) return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid Email or Password' })

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    return res.status(200).send({ status: true, statusCode: 200, message: 'Login success', data: { accessToken } })
  } catch (error: any) {
    logger.error(`ERR: auth - create session = ${error.message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}
