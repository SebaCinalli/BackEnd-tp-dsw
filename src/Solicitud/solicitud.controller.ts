import { Solicitud } from './solicitud.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { Usuario } from '../Usuario/usuario.entity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

const en = orm.em.fork();
en.getRepository(Solicitud);

function sanitizedSolicitudInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Convertir fecha del formato DD/MM/YYYY a Date
  let fechaSolicitud = req.body.fechaSolicitud;
  if (typeof fechaSolicitud === 'string') {
    const [day, month, year] = fechaSolicitud.split('/');
    fechaSolicitud = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
  }

  req.body.sanitizedInput = {
    usuario: req.body.usuario, // Usuario siempre requerido
    fechaSolicitud: fechaSolicitud,
    estado: req.body.estado,
  };

  // Agregar servicios opcionales solo si están presentes
  if (req.body.dj) {
    req.body.sanitizedInput.dj = req.body.dj;
  }
  if (req.body.salon) {
    req.body.sanitizedInput.salon = req.body.salon;
  }
  if (req.body.gastronomico) {
    req.body.sanitizedInput.gastronomico = req.body.gastronomico;
  }
  if (req.body.barra) {
    req.body.sanitizedInput.barra = req.body.barra;
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
    const solicitudes = await en.find(
      Solicitud,
      {},
      { populate: ['usuario', 'dj', 'salon', 'barra', 'gastronomico'] }
    );
    res.status(200).json({
      message: 'todas las solicitudes encontradas',
      data: solicitudes,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const solicitud = await en.findOneOrFail(Solicitud, id, {
      populate: ['usuario', 'dj', 'salon', 'barra', 'gastronomico'],
    });
    res.status(200).json({ message: 'solicitud encontrada', data: solicitud });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    // Obtener el usuario (siempre requerido)
    const usuario = await en.findOneOrFail(
      Usuario,
      req.body.sanitizedInput.usuario
    );

    const solicitudData: any = {
      usuario: usuario,
      estado: req.body.sanitizedInput.estado || 'pendiente',
      fechaSolicitud: req.body.sanitizedInput.fechaSolicitud || new Date(),
    };

    let montoTotal = 0;

    // Procesar DJ si se proporciona
    if (req.body.sanitizedInput.dj) {
      const dj = await en.findOneOrFail(Dj, req.body.sanitizedInput.dj);
      solicitudData.dj = dj;
      solicitudData.montoDj = dj.montoDj;
      montoTotal += dj.montoDj;
    }

    // Procesar Salon si se proporciona
    if (req.body.sanitizedInput.salon) {
      const salon = await en.findOneOrFail(
        Salon,
        req.body.sanitizedInput.salon
      );
      solicitudData.salon = salon;
      solicitudData.montoSalon = salon.montoS;
      montoTotal += salon.montoS;
    }

    // Procesar Barra si se proporciona
    if (req.body.sanitizedInput.barra) {
      const barra = await en.findOneOrFail(
        Barra,
        req.body.sanitizedInput.barra
      );
      solicitudData.barra = barra;
      solicitudData.montoBarra = barra.montoB;
      montoTotal += barra.montoB;
    }

    // Procesar Gastronomico si se proporciona
    if (req.body.sanitizedInput.gastronomico) {
      const gastronomico = await en.findOneOrFail(
        Gastro,
        req.body.sanitizedInput.gastronomico
      );
      solicitudData.gastronomico = gastronomico;
      solicitudData.montoGastro = gastronomico.montoG;
      montoTotal += gastronomico.montoG;
    }

    solicitudData.montoTotal = montoTotal;

    const solicitud = en.create(Solicitud, solicitudData);
    await en.flush();
    res.status(201).json({ message: 'solicitud creada', data: solicitud });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const solicitud = await en.findOneOrFail(Solicitud, id);
    en.assign(solicitud, req.body.sanitizedInput);
    await en.flush();
    res.status(200).json({ message: 'solicitud modificada', data: solicitud });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const solicitud = en.getReference(Solicitud, id);
    await en.removeAndFlush(solicitud);
    res.status(200).json({ message: 'solicitud borrada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedSolicitudInput, findAll, findById, add, modify, remove };
