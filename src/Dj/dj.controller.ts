import { Dj } from './dj.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { deleteImageFile, replaceImageFile } from '../shared/imageUtils.js';
import { obtenerServiciosReservados } from '../shared/reservaUtils.js';

const em = orm.em.fork();

function sanitizedDjInput(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.sanitizedInput = {
      nombreArtistico: req.body.nombreArtistico,
      estado: req.body.estado,
      montoDj: req.body.montoDj,
      foto: req.body.foto,
      zona: req.body.zona,
    };

    if(req.body.sanitizedInput.zona === undefined){
    res.status(403).json({message: 'no autorizado'})
    return;
  }


    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('findAll llamado');

    // Obtener la fecha del query parameter
    const fecha = req.query.fecha as string;

    let djs = await em.find(Dj, {});
    console.log('Found DJs:', djs);

    // Si se proporciona una fecha, filtrar los DJs reservados para esa fecha
    if (fecha) {
      try {
        const djsReservados = await obtenerServiciosReservados(fecha, 'dj');
        console.log('DJs reservados para fecha', fecha, ':', djsReservados);

        // Filtrar los DJs que no están reservados para esa fecha
        djs = djs.filter((dj) => !djsReservados.includes(dj.id));

        res.status(200).json({
          message: `DJs disponibles para la fecha ${fecha}`,
          data: djs,
          fechaConsultada: fecha,
          djsReservados: djsReservados,
        });
      } catch (error) {
        console.error('Error al filtrar DJs por fecha:', error);
        res
          .status(200)
          .json({ message: 'todos los dj encontrados', data: djs });
      }
    } else {
      res.status(200).json({ message: 'todos los dj encontrados', data: djs });
    }
  } catch (error: any) {
    next(error);
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const dj = await em.findOneOrFail(Dj, { id });
    res.status(200).json({ message: 'dj encontrado', data: dj });
  } catch (error: any) {
    next(error);
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    // Si se subió una imagen, agregar el nombre del archivo
    if (req.file) {
      req.body.sanitizedInput.foto = req.file.filename;
    }

    const dj = em.create(Dj, req.body.sanitizedInput);
    await em.flush();

    // Incluir URL de la imagen en la respuesta si existe
    const response: any = {
      message: 'dj creado',
      data: {
        ...dj,
        imageUrl: dj.foto
          ? `http://localhost:3000/uploads/djs/${dj.foto}`
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
    const dj = await em.findOneOrFail(Dj, { id });
    em.assign(dj, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'DJ actualizado', data: dj });
  } catch (error: any) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    // Primero obtener el DJ para acceder a su imagen
    const dj = await em.findOneOrFail(Dj, { id });

    // Eliminar la imagen si existe
    if (dj.foto) {
      deleteImageFile('djs', dj.foto);
    }

    // Luego eliminar el DJ de la base de datos
    await em.removeAndFlush(dj);
    res.status(200).json({ message: 'DJ eliminado' });
  } catch (error: any) {
    next(error);
  }
}

//SUBIR IMAGEN

async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const dj = await em.findOneOrFail(Dj, { id });

    if (!req.file) {
      res.status(400).json({ message: 'No se subió ningún archivo' });
      return;
    }

    // Eliminar imagen anterior si existe
    const oldImage = dj.foto;

    // Actualizar la entidad con el nombre del archivo
    dj.foto = req.file.filename;
    await em.flush();

    // Eliminar la imagen anterior después de guardar la nueva
    if (oldImage) {
      replaceImageFile('djs', oldImage, req.file.filename);
    }

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      data: {
        id: dj.id,
        foto: dj.foto,
        imageUrl: `http://localhost:3000/uploads/djs/${dj.foto}`,
      },
    });
  } catch (error: any) {
    next(error);
  }
}

export {
  sanitizedDjInput,
  findAll,
  findById,
  add,
  modify,
  remove,
  uploadImage,
};
