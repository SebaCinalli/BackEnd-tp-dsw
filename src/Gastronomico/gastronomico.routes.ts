import { Router } from 'express';
import {
  sanitizedGastronomicoInput,
  findAll,
  findById,
  add,
  modify,
  remove,
} from './gastronomico.controller.js';

export const GastroRouter = Router();

GastroRouter.get('/', findAll);

GastroRouter.get('/:id', findById);

GastroRouter.post('/', sanitizedGastronomicoInput,add);

GastroRouter.put('/:id', sanitizedGastronomicoInput, modify)

GastroRouter.delete('/:id', remove)
