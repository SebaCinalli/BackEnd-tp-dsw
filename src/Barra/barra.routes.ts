import { Router } from 'express';
import { findAll, findById, add, modify, remove } from './barra.controller.js';

export const BarraRouter = Router();

BarraRouter.get('/', findAll);

BarraRouter.get('/:id', findById);

BarraRouter.post('/', add);
