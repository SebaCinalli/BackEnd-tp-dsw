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
import { uploadDj } from '../middleware/upload.js';

export const DjRouter = Router();

DjRouter.get('/', findAll);

DjRouter.get('/:id', findById);

DjRouter.post('/', sanitizedDjInput, add);

DjRouter.put('/:id', sanitizedDjInput, modify);

DjRouter.delete('/:id', remove);

// Ruta para subir imagen
DjRouter.post('/:id/upload-image', uploadDj, uploadImage);
