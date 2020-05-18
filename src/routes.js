import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import auth from './app/middlewares/auth';


const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(auth);

routes.put('/users', UserController.update);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

export default routes;