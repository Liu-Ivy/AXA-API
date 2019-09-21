import express from 'express';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getUserByName);