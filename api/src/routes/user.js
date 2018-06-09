import express from 'express';
import UserController from '../controllers/user';
import {authLocal, authJwt} from '../config/passport'; 

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', authLocal, UserController.login);
//router.post('/logout', UserController.logout);
router.get('/', authJwt, UserController.getUsers);
router.get('/:id', UserController.getUserById);
//router.post('/forgot-password', UserController.forgotPassword);
//router.post('/reset-password/:token', UserController.reset);

export default router;