import { Router } from 'express';
import { findAll, findById, add, modify, remove } from './salon.controller.js';

export const SalonRouter = Router();

SalonRouter.get('/', findAll);

SalonRouter.get('/:id', findById);

SalonRouter.post('/', add);
