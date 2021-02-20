
import { Router } from 'express'
import ShorterController from './controllers/ShorterController'

const routes = Router()

routes.post('/', ShorterController.short)
routes.get('/:shorted', ShorterController.recover)

export default routes
