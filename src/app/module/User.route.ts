import express from 'express';
import { UserControllers } from './User.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

export const UserRoutes = router;
