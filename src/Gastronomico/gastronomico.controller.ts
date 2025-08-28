import { Gastro } from './gastronomico.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { deleteImageFile, replaceImageFile } from '../shared/imageUtils.js';

const en = orm.em.fork();

function sanitizedGastronomicoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombreG: req.body.nombreG,
    tipoComida: req.body.tipoComida,
    montoG: req.body.montoG,
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

en.getRepository(Gastro);

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const gastronom = await en.find(Gastro, {});
    res.status(200).json({
      message: 'Todas los gastronomicos encontrados',
      data: gastronom,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const gastro = await en.findOneOrFail(Gastro, id);
    res.status(200).json({ message: 'gastronomico encontrado', data: gastro });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    // Si se subió una imagen, agregar el nombre del archivo
    if (req.file) {
      req.body.sanitizedInput.foto = req.file.filename;
    }

    const gastro = en.create(Gastro, req.body.sanitizedInput);
    await en.flush();

    // Incluir URL de la imagen en la respuesta si existe
    const response: any = {
      message: 'gastronomico creado',
      data: {
        ...gastro,
        imageUrl: gastro.foto
          ? `http://localhost:3000/uploads/gastronomicos/${gastro.foto}`
          : null,
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const gastro = await en.findOneOrFail(Gastro, id);
    en.assign(gastro, req.body.sanitizedInput);
    await en.flush();
    res.status(200).json({ message: 'gastronomico actualizado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    // Primero obtener el gastronomico para acceder a su imagen
    const gastro = await en.findOneOrFail(Gastro, id);

    // Eliminar la imagen si existe
    if (gastro.foto) {
      deleteImageFile('gastronomicos', gastro.foto);
    }

    // Luego eliminar el gastronomico de la base de datos
    await en.removeAndFlush(gastro);
    res.status(200).json({ message: 'gastronomico borrado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//SUBIR IMAGEN

async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const gastro = await en.findOneOrFail(Gastro, id);

    if (!req.file) {
      res.status(400).json({ message: 'No se subió ningún archivo' });
      return;
    }

    // Eliminar imagen anterior si existe
    const oldImage = gastro.foto;

    // Actualizar la entidad con el nombre del archivo
    gastro.foto = req.file.filename;
    await en.flush();

    // Eliminar la imagen anterior después de guardar la nueva
    if (oldImage) {
      replaceImageFile('gastronomicos', oldImage, req.file.filename);
    }

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      data: {
        id: gastro.id,
        foto: gastro.foto,
        imageUrl: `http://localhost:3000/uploads/gastronomicos/${gastro.foto}`,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizedGastronomicoInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
};
