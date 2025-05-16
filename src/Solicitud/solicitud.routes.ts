import { Router } from 'express';
import {
  sanitizedSolicitudInput,
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

SolicitudRouter.post('/', sanitizedSolicitudInput,add);

SolicitudRouter.put('/:id', sanitizedSolicitudInput, modify)

SolicitudRouter.delete('/:id', remove)
