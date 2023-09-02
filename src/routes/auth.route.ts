import { Router } from 'express'
import { registerUser } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
// AuthRouter.get('/:id', getAuth)
// AuthRouter.post('/', createAuth)
// AuthRouter.put('/:id', updateAuth)
// AuthRouter.delete('/:id', deleteAuth)
