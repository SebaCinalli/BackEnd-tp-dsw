import { Router } from 'express';
import { sanitizedBarraInput,findAll, findById, add, modify, remove } from './barra.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const BarraRouter = Router();

// Rutas de consulta no necesitan sanitización
BarraRouter.get('/', verifyToken,findAll);
BarraRouter.get('/:id', verifyToken, findById);

// Rutas que modifican datos necesitan sanitización
BarraRouter.post('/', verifyToken,sanitizedBarraInput, add);
BarraRouter.put('/:id', verifyToken,sanitizedBarraInput, modify);
BarraRouter.delete('/:id', verifyToken, remove);
