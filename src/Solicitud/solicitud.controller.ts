import { Solicitud } from './solicitud.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { Cliente } from '../Cliente/cliente.entity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

const en = orm.em;
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
    cliente: req.body.cliente,
    dj: req.body.dj,
    salon: req.body.salon,
    gastronomico: req.body.gastronomico,
    barra: req.body.barra,
    fechaSolicitud: fechaSolicitud,
    estado: req.body.estado,
    montoDj: req.body.montoDj,
    montoSalon: req.body.montoSalon,
    montoBarra: req.body.montoBarra,
    montoGastro: req.body.montoGastro,
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
    const solicitudes = await en.find(
      Solicitud,
      {},
      { populate: ['cliente', 'dj', 'salon', 'barra', 'gastronomico'] }
    );
    res
      .status(200)
      .json({
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
      populate: ['cliente', 'dj', 'salon', 'barra', 'gastronomico'],
    });
    res.status(200).json({ message: 'solicitud encontrada', data: solicitud });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    // Obtener las entidades relacionadas para calcular montos
    const cliente = await en.findOneOrFail(
      Cliente,
      req.body.sanitizedInput.cliente
    );
    const dj = await en.findOneOrFail(Dj, req.body.sanitizedInput.dj);
    const salon = await en.findOneOrFail(Salon, req.body.sanitizedInput.salon);
    const barra = await en.findOneOrFail(Barra, req.body.sanitizedInput.barra);
    const gastronomico = await en.findOneOrFail(
      Gastro,
      req.body.sanitizedInput.gastronomico
    );

    // Si no se proporcionaron montos, usar los precios de las entidades
    // (asumiendo que las entidades tienen propiedades de precio)
    const solicitudData = {
      ...req.body.sanitizedInput,
      cliente: cliente,
      dj: dj,
      salon: salon,
      barra: barra,
      gastronomico: gastronomico,
      // Si las entidades tienen precios, usarlos como montos por defecto
      montoDj: req.body.sanitizedInput.montoDj || (dj as any).precio || 0,
      montoSalon:
        req.body.sanitizedInput.montoSalon || (salon as any).precio || 0,
      montoBarra:
        req.body.sanitizedInput.montoBarra || (barra as any).precio || 0,
      montoGastro:
        req.body.sanitizedInput.montoGastro ||
        (gastronomico as any).precio ||
        0,
    };

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
