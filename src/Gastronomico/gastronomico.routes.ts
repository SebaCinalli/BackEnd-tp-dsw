import { Router } from 'express';
import {
  findAll,
  findById,
  add,
  modify,
  remove,
} from './gastronomico.controller.js';

export const GastroRouter = Router();

GastroRouter.get('/', findAll);

GastroRouter.get('/:id', findById);

GastroRouter.post('/', add);
