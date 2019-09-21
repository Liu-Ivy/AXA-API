import express from 'express';

const router = express.Router();

router.get('/', getPolicies);
router.get('/:id', getByUsername);