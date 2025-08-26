import { Router } from 'express';
import {
  findAll,
  findById,
  verifyUser,
  add,
  modify,
  remove,
  logout,
  verifyAndGetProfile,
} from './usuario.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { sanitizeUserInput } from '../middleware/sanitizateUser.js';

export const UsuarioRouter = Router();

// Rutas de consulta no necesitan sanitización
UsuarioRouter.get('/', findAll);
UsuarioRouter.get('/:id', verifyToken, findById);
UsuarioRouter.post('/login', verifyUser);
UsuarioRouter.post('/verify', verifyToken, verifyAndGetProfile);
UsuarioRouter.post('/logout', logout);

// Rutas que modifican datos necesitan sanitización
UsuarioRouter.post('/register', sanitizeUserInput, add);
UsuarioRouter.put('/:id', sanitizeUserInput, modify);
UsuarioRouter.delete('/:id', remove);
