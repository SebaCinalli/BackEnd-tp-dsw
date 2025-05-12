import { Router } from 'express';
import {
  sanitizedDjInput,
  findAll,
  findById,
  add,
  modify,
  remove,
} from './dj.controller.js';

export const DjRouter = Router();

DjRouter.get('/', findAll);

DjRouter.get('/:id', findById);

DjRouter.post('/', add);
