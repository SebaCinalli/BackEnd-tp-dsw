import { Router } from 'express';
import { sanitizedBarraInput,findAll, findById, add, modify, remove } from './barra.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

export const BarraRouter = Router();

// Rutas de consulta no necesitan sanitización
BarraRouter.get('/', verifyToken,verifyAdmin,findAll);
BarraRouter.get('/:id', verifyToken, verifyAdmin, findById);

// Rutas que modifican datos necesitan sanitización
BarraRouter.post('/', verifyToken,sanitizedBarraInput, verifyAdmin, add);
BarraRouter.put('/:id', verifyToken,sanitizedBarraInput, verifyAdmin, modify);
BarraRouter.delete('/:id', verifyToken, verifyAdmin, remove);
