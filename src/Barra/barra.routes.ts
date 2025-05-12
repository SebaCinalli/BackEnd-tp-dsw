import { Router } from 'express';
import { sanitizedBarraInput,findAll, findById, add, modify, remove } from './barra.controller.js';

export const BarraRouter = Router();

// Rutas de consulta no necesitan sanitización
BarraRouter.get('/', findAll);
BarraRouter.get('/:id', findById);

// Rutas que modifican datos necesitan sanitización
BarraRouter.post('/', sanitizedBarraInput, add);
BarraRouter.put('/:id', sanitizedBarraInput, modify);
BarraRouter.delete('/:id', remove);
