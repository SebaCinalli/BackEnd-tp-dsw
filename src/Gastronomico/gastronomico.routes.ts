import { Router } from 'express';
import {
  sanitizedGastronomicoInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
} from './gastronomico.controller.js';
import {
  uploadGastronomico,
  uploadGastronomicoOptional,
} from '../middleware/upload.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

export const GastroRouter = Router();

GastroRouter.get('/', verifyToken, findAll);

GastroRouter.get('/:id', verifyToken, findById);

GastroRouter.post(
  '/',
  verifyToken,
  uploadGastronomicoOptional,
  sanitizedGastronomicoInput,
  verifyAdmin,
  add
);

GastroRouter.put(
  '/:id',
  verifyToken,
  sanitizedGastronomicoInput,
  verifyAdmin,
  modify
);

GastroRouter.delete('/:id', verifyToken, verifyAdmin, remove);

// Ruta para subir imagen
GastroRouter.post(
  '/:id/upload-image',
  verifyToken,
  verifyAdmin,
  uploadGastronomico,
  uploadImage
);
