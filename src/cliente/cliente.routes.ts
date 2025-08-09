import { Router } from 'express';
import {
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
import {sanitizeUserInput } from '../middleware/sanitizateUser.js';

export const ClienteRouter = Router();

// Rutas de consulta no necesitan sanitización
ClienteRouter.get('/', findAll);
ClienteRouter.get('/:id', verifyToken,findById);
ClienteRouter.post('/login', verifyUser);
ClienteRouter.post('/verify', verifyToken, verifyAndGetProfile);
ClienteRouter.post('/logout', logout)

// Rutas que modifican datos necesitan sanitización
ClienteRouter.post('/register', sanitizeUserInput, add);
ClienteRouter.put('/:id', sanitizeUserInput, modify);
ClienteRouter.delete('/:id', remove);
