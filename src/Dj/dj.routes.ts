import { Router } from 'express';
import {
  sanitizedDjInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
} from './dj.controller.js';
import { uploadDj, uploadDjOptional } from '../middleware/upload.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

export const DjRouter = Router();

DjRouter.get('/', verifyToken, findAll);

DjRouter.get('/:id', verifyToken, findById);

DjRouter.post(
  '/',
  verifyToken,
  uploadDjOptional,
  sanitizedDjInput,
  verifyAdmin,
  add
);

DjRouter.put('/:id', verifyToken, sanitizedDjInput, verifyAdmin, modify);

DjRouter.delete('/:id', verifyToken, verifyAdmin, remove);

// Ruta para subir imagen
DjRouter.post(
  '/:id/upload-image',
  verifyToken,
  verifyAdmin,
  uploadDj,
  uploadImage
);
