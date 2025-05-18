import { Router } from 'express';
import { sanitizedSalonInput,findAll, findById, add, modify, remove, } from './salon.controller.js';

export const SalonRouter = Router();

SalonRouter.get('/', findAll);

SalonRouter.get('/:id', findById);

SalonRouter.post('/', sanitizedSalonInput, add);

SalonRouter.put('/:id', sanitizedSalonInput, modify)

SalonRouter.delete('/:id', remove)
