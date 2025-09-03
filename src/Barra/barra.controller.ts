import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { Barra } from './barra.entity.js';
import { deleteImageFile, replaceImageFile } from '../shared/imageUtils.js';
import { obtenerServiciosReservados } from '../shared/reservaUtils.js';
import { Zona } from '../Zona/zona.entity.js';

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

  if (req.body.sanitizedInput.zona === undefined) {
    res.status(403).json({ message: 'no autorizado' });
    return;
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    // Obtener la fecha y zona del query parameter
    const fecha = req.query.fecha as string;
    const zonaId = req.query.zona as string;

    // Construir filtros para la consulta
    const filters: any = {};
    if (zonaId) {
      filters.zona = Number.parseInt(zonaId);
    }

    let barras = await en.find(Barra, filters, { populate: ['zona'] });

    // Si se proporciona una fecha, filtrar las barras reservadas para esa fecha
    if (fecha) {
      try {
        const barrasReservadas = await obtenerServiciosReservados(
          fecha,
          'barra'
        );
        console.log(
          'Barras reservadas para fecha',
          fecha,
          ':',
          barrasReservadas
        );

        // Filtrar las barras que no están reservadas para esa fecha
        barras = barras.filter((barra) => !barrasReservadas.includes(barra.id));

        res.status(200).json({
          message: `Barras disponibles para la fecha ${fecha}${
            zonaId ? ` en la zona ${zonaId}` : ''
          }`,
          data: barras,
          fechaConsultada: fecha,
          zonaFiltrada: zonaId || null,
          barrasReservadas: barrasReservadas,
        });
      } catch (error) {
        console.error('Error al filtrar barras por fecha:', error);
        res.status(200).json({
          message: `todas las barras encontradas${
            zonaId ? ` en la zona ${zonaId}` : ''
          }`,
          data: barras,
          zonaFiltrada: zonaId || null,
        });
      }
    } else {
      res.status(200).json({
        message: `todas las barras encontradas${
          zonaId ? ` en la zona ${zonaId}` : ''
        }`,
        data: barras,
        zonaFiltrada: zonaId || null,
      });
    }
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
    // Si se subió una imagen, agregar el nombre del archivo
    if (req.file) {
      req.body.sanitizedInput.foto = req.file.filename;
    }

    // Convertir ID de zona en referencia a la entidad Zona
    if (req.body.sanitizedInput.zona) {
      req.body.sanitizedInput.zona = en.getReference(
        'Zona',
        req.body.sanitizedInput.zona
      );
    }

    const barra = en.create(Barra, req.body.sanitizedInput);
    await en.flush();

    // Incluir URL de la imagen en la respuesta si existe
    const response: any = {
      message: 'barra creada',
      data: {
        ...barra,
        imageUrl: barra.foto
          ? `http://localhost:3000/uploads/barras/${barra.foto}`
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
    const barra = await en.findOneOrFail(Barra, id);

    // Convertir ID de zona en referencia a la entidad Zona si se está actualizando
    if (req.body.sanitizedInput.zona) {
      req.body.sanitizedInput.zona = en.getReference(
        'Zona',
        req.body.sanitizedInput.zona
      );
    }

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
