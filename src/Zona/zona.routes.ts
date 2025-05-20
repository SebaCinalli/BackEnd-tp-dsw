import { Router } from 'express';
import {
  sanitizedZonaInput,
  findAll,
  findById,
  add,
  modify,
  remove,
} from './zona.controller.js';

export const ZonaRouter = Router();

ZonaRouter.get('/', findAll);
ZonaRouter.get('/:id', findById);
ZonaRouter.post('/', sanitizedZonaInput, add);
ZonaRouter.put('/:id', sanitizedZonaInput, modify);
ZonaRouter.delete('/:id', remove);
