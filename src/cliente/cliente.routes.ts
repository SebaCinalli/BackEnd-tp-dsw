import { Router } from 'express';
import {
  sanitizeClienteInput,
  findAll,
  findById,
  verifyUser,
  add,
  modify,
  remove,
  logout,
  verifyAndGetProfile
} from './cliente.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
  
export const ClienteRouter = Router();

// Rutas de consulta no necesitan sanitización
ClienteRouter.get('/', findAll);
ClienteRouter.get('/:id', verifyToken,findById);
ClienteRouter.post('/login', verifyUser);
ClienteRouter.post('/verify', verifyToken, verifyAndGetProfile);
ClienteRouter.post('/logout', logout)

// Rutas que modifican datos necesitan sanitización
ClienteRouter.post('/', sanitizeClienteInput, add);
ClienteRouter.put('/:id', sanitizeClienteInput, modify);
ClienteRouter.delete('/:id', remove);
