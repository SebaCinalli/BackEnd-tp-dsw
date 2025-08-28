import { Router } from 'express';
import {
  sanitizedBarraInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
} from './barra.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { uploadBarra } from '../middleware/upload.js';

export const BarraRouter = Router();

// Rutas de consulta no necesitan sanitización
BarraRouter.get('/', verifyToken, findAll);
BarraRouter.get('/:id', verifyToken, findById);

// Rutas que modifican datos necesitan sanitización
BarraRouter.post(
  '/',
  verifyToken,
  uploadBarra,
  sanitizedBarraInput,
  verifyAdmin,
  add
);
BarraRouter.put('/:id', verifyToken, sanitizedBarraInput, verifyAdmin, modify);
BarraRouter.delete('/:id', verifyToken, verifyAdmin, remove);

// Ruta para subir imagen
BarraRouter.post(
  '/:id/upload-image',
  verifyToken,
  verifyAdmin,
  uploadBarra,
  uploadImage
);
