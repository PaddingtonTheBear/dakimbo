import { Router } from 'express';
import auth from './auth';
import user from './user';
import data from './data';
import metrics from './metrics';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/data', data);
routes.use('/metrics', metrics);

export default routes;