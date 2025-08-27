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
import { uploadSalon } from '../middleware/upload.js';

export const SalonRouter = Router();

SalonRouter.get('/', findAll);

SalonRouter.get('/:id', findById);

SalonRouter.post('/', sanitizedSalonInput, add);

SalonRouter.put('/:id', sanitizedSalonInput, modify);

SalonRouter.delete('/:id', remove);

// Ruta para subir imagen
SalonRouter.post('/:id/upload-image', uploadSalon, uploadImage);
