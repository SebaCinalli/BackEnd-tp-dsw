import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { Barra } from './barra.entity.js';
import { deleteImageFile, replaceImageFile } from '../shared/imageUtils.js';

const en = orm.em.fork();

function sanitizedBarraInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombreB: req.body.nombreB,
    tipoBebida: req.body.tipoBebida,
    montoB: req.body.montoB,
    foto: req.body.foto,
    solicitud: req.body.solicitud,
    zona: req.body.zona,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const barras = await en.find(Barra, {});
    res
      .status(200)
      .json({ message: 'todas las barras encontradas', data: barras });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const barra = await en.findOneOrFail(Barra, id);
    res.status(200).json({ message: 'barra encontrada', data: barra });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    const barra = en.create(Barra, req.body.sanitizedInput);
    await en.flush();
    res.status(201).json({ message: 'barra creada', data: barra });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const barra = await en.findOneOrFail(Barra, id);
    en.assign(barra, req.body.sanitizedInput);
    await en.flush();
    res.status(200).json({ message: 'barra modificada', data: barra });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    // Primero obtener la barra para acceder a su imagen
    const barra = await en.findOneOrFail(Barra, id);

    // Eliminar la imagen si existe
    if (barra.foto) {
      deleteImageFile('barras', barra.foto);
    }

    // Luego eliminar la barra de la base de datos
    await en.removeAndFlush(barra);
    res.status(200).json({ message: 'barra borrada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//SUBIR IMAGEN

async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const barra = await en.findOneOrFail(Barra, id);

    if (!req.file) {
      res.status(400).json({ message: 'No se subió ningún archivo' });
      return;
    }

    // Eliminar imagen anterior si existe
    const oldImage = barra.foto;

    // Actualizar la entidad con el nombre del archivo
    barra.foto = req.file.filename;
    await en.flush();

    // Eliminar la imagen anterior después de guardar la nueva
    if (oldImage) {
      replaceImageFile('barras', oldImage, req.file.filename);
    }

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      data: {
        id: barra.id,
        foto: barra.foto,
        imageUrl: `http://localhost:3000/uploads/barras/${barra.foto}`,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizedBarraInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
};
