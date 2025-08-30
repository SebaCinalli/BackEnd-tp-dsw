import { Router } from 'express';
import {
  sanitizedSalonInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
} from './salon.controller.js';
import { uploadSalon, uploadSalonOptional } from '../middleware/upload.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

export const SalonRouter = Router();

SalonRouter.get('/', verifyToken, findAll);

SalonRouter.get('/:id', verifyToken, findById);

SalonRouter.post(
  '/',
  verifyToken,
  uploadSalonOptional,
  sanitizedSalonInput,
  verifyAdmin,
  add
);

SalonRouter.put('/:id', verifyToken, sanitizedSalonInput, verifyAdmin, modify);

SalonRouter.delete('/:id', verifyToken, verifyAdmin, remove);

// Ruta para subir imagen
SalonRouter.post(
  '/:id/upload-image',
  verifyToken,
  verifyAdmin,
  uploadSalon,
  uploadImage
);
