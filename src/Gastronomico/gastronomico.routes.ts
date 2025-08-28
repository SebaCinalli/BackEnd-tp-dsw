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
import { uploadGastronomico } from '../middleware/upload.js';

export const GastroRouter = Router();

GastroRouter.get('/', findAll);

GastroRouter.get('/:id', findById);

GastroRouter.post('/', uploadGastronomico, sanitizedGastronomicoInput, add);

GastroRouter.put('/:id', sanitizedGastronomicoInput, modify);

GastroRouter.delete('/:id', remove);

// Ruta para subir imagen
GastroRouter.post('/:id/upload-image', uploadGastronomico, uploadImage);
