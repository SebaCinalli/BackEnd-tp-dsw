import { Router } from 'express';
import {
  sanitizedZonaInput,
  findAll,
  findById,
  add,
  modify,
  remove,
} from './zona.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

export const ZonaRouter = Router();

ZonaRouter.get('/', verifyToken, findAll);
ZonaRouter.get('/:id', verifyToken, findById);
ZonaRouter.post('/', verifyToken, sanitizedZonaInput, verifyAdmin, add);
ZonaRouter.put('/:id', verifyToken, sanitizedZonaInput, verifyAdmin, modify);
ZonaRouter.delete('/:id', verifyToken, verifyAdmin, remove);
