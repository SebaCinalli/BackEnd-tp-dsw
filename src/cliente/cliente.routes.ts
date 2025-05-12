import { Router } from 'express';
import {
  sanitizeClienteInput,
  findAll,
  findById,
  add,
  modify,
  remove,
} from './cliente.controller.js';

export const ClienteRouter = Router();

// Rutas de consulta no necesitan sanitización
ClienteRouter.get('/', findAll);
ClienteRouter.get('/:id', findById);

// Rutas que modifican datos necesitan sanitización
ClienteRouter.post('/', sanitizeClienteInput, add);
ClienteRouter.put('/:id', sanitizeClienteInput, modify);
ClienteRouter.delete('/:id', remove);
