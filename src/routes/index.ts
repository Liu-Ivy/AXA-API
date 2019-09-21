import express from 'express';
import usersRoutes from './users';
import policiesRoutes from './po]icies';

const router = express.Router();//it's a method

router.use('/users', usersRoutes);
router.use('/policies', policiesRoutes);

export default router;
