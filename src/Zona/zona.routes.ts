import { Router } from 'express';
import { findAll, findById, add, modify, remove } from './zona.controller.js';

export const ZonaRouter = Router();

ZonaRouter.get('/', findAll);

ZonaRouter.get('/:id', findById);

ZonaRouter.post('/', add);
