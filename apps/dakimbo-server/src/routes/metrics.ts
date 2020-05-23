import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import MetricsController from '../controllers/metricsController';

const router = Router();

// Get specific metric
router.get('/:metricName', [checkJwt, checkRole(['superadmin'])], MetricsController.getMetricsFor);

export default router;