import express from 'express';
// import { testController } from './test.controller';
import { plantController } from './controllers/plant/plant.controller';
import { authController } from './controllers/auth/auth.controller';
import { userController } from './controllers/user/userController';

export const router: express.Router = express.Router();

// router.use('/hey', testController);

router.use('/auth', authController);

router.use('/user', userController);

router.use('/plant', plantController);
