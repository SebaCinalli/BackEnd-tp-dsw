import { Router } from 'express';
import {
  findAll,
  findById,
  add,
  modify,
  remove,
} from './solicitud.controller.js';

export const SolicitudRouter = Router();

SolicitudRouter.get('/', findAll);

SolicitudRouter.get('/:id', findById);

SolicitudRouter.post('/', add);
