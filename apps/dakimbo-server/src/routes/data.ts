import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import DataController from '../controllers/dataController';
import config from '../config';

const router = Router();

if (config.isProd) {
	router.get('/:entity', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.get);

	router.post('/:entity', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.create);

	router.patch('/:entity/:id', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.update);

	router.put('/:entity/:id', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.update);

	router.delete('/:entity/:id', [checkJwt, checkRole(['superamdin', 'admin'])], DataController.delete);
} else {
	router.get('/:entity', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.get);

	router.post('/:entity', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.create);

	router.patch('/:entity/:id', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.update);

	router.put('/:entity/:id', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.update);

	router.delete('/:entity/:id', [checkJwt, checkRole(['superadmin', 'admin'])], DataController.delete);
}

export default router;
