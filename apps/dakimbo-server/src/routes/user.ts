import { Router } from 'express';
import UserController from '../controllers/userController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all users
router.get('/', [checkJwt, checkRole(['admin'])], UserController.listAll);

// Get one user
router.get('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.getOneById);

//Create a new user
router.post('/', UserController.newUser);

//Edit one user
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.editUser);

//Delete one user
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

// Current User
router.get('/me', [checkJwt], UserController.getCurrentUser);

export default router;
