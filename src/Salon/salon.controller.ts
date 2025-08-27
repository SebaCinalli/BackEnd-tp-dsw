import { Salon } from './salon.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { deleteImageFile, replaceImageFile } from '../shared/imageUtils.js';

const en = orm.em.fork();

function sanitizedSalonInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    estado: req.body.estado,
    montoS: req.body.montoS,
    capacidad: req.body.capacidad,
    foto: req.body.foto,
    solcitud: req.body.solicitud,
    zona: req.body.zona,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

en.getRepository(Salon);

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const salones = await en.find(Salon, {});
    res
      .status(200)
      .json({ message: 'todos los salones encontrados', data: salones });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const salon = await en.findOneOrFail(Salon, id);
    res.status(200).json({ message: 'salon encontrado', data: salon });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    const salon = en.create(Salon, req.body.sanitizedInput);
    await en.flush();
    res.status(201).json({ message: 'salon creado', data: salon });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const salon = await en.findOneOrFail(Salon, id);
    en.assign(salon, req.body.sanitizedInput);
    await en.flush();
    res.status(200).json({ message: 'salon actualizado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    // Primero obtener el salon para acceder a su imagen
    const salon = await en.findOneOrFail(Salon, id);

    // Eliminar la imagen si existe
    if (salon.foto) {
      deleteImageFile('salones', salon.foto);
    }

    // Luego eliminar el salon de la base de datos
    await en.removeAndFlush(salon);
    res.status(200).json({ message: 'salon borrado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//SUBIR IMAGEN

async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const salon = await en.findOneOrFail(Salon, id);

    if (!req.file) {
      res.status(400).json({ message: 'No se subió ningún archivo' });
      return;
    }

    // Eliminar imagen anterior si existe
    const oldImage = salon.foto;

    // Actualizar la entidad con el nombre del archivo
    salon.foto = req.file.filename;
    await en.flush();

    // Eliminar la imagen anterior después de guardar la nueva
    if (oldImage) {
      replaceImageFile('salones', oldImage, req.file.filename);
    }

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      data: {
        id: salon.id,
        foto: salon.foto,
        imageUrl: `http://localhost:3000/uploads/salones/${salon.foto}`,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizedSalonInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
};
