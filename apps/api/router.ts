import express from 'express';
import { plantsController } from './controllers/plants/plants.controller';
import { authController } from './controllers/auth/auth.controller';
import { usersController } from './controllers/users/users.controller';
import { placesController } from "./controllers/places/places.controller";
import { tasksController } from "./controllers/tasks/tasks.controller";

export const router: express.Router = express.Router();

router.use('/auth', authController);
router.use('/users', usersController);
router.use('/plants', plantsController);
router.use('/places', placesController)
router.use('/tasks', tasksController)