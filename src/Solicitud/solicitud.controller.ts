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

  req.body.sanitizedInput = {};

  // Solo agregar campos que están presentes en el body
  if (req.body.usuario !== undefined) {
    req.body.sanitizedInput.usuario = req.body.usuario;
  }
  if (fechaSolicitud !== undefined) {
    req.body.sanitizedInput.fechaSolicitud = fechaSolicitud;
  }
  if (req.body.estado !== undefined) {
    req.body.sanitizedInput.estado = req.body.estado;
  }
  if (req.body.dj !== undefined) {
    req.body.sanitizedInput.dj = req.body.dj;
  }
  if (req.body.salon !== undefined) {
    req.body.sanitizedInput.salon = req.body.salon;
  }
  if (req.body.gastronomico !== undefined) {
    req.body.sanitizedInput.gastronomico = req.body.gastronomico;
  }
  if (req.body.barra !== undefined) {
    req.body.sanitizedInput.barra = req.body.barra;
  }

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
    const solicitud = await en.findOneOrFail(Solicitud, id, {
      populate: ['usuario', 'dj', 'salon', 'barra', 'gastronomico'],
    });

    // Solo actualizar los campos que se proporcionan en el body
    const input = req.body.sanitizedInput;

    // Actualizar datos básicos
    if (input.estado !== undefined) {
      solicitud.estado = input.estado;
    }
    if (input.fechaSolicitud !== undefined) {
      solicitud.fechaSolicitud = input.fechaSolicitud;
    }

    // Actualizar usuario si se proporciona
    if (input.usuario !== undefined) {
      const usuario = await en.findOneOrFail(Usuario, input.usuario);
      solicitud.usuario = usuario;
    }

    // Actualizar servicios y recalcular montos
    let needsRecalculation = false;

    // Procesar DJ
    if (input.dj !== undefined) {
      needsRecalculation = true;
      if (input.dj === null) {
        solicitud.dj = undefined;
        solicitud.montoDj = undefined;
      } else {
        const dj = await en.findOneOrFail(Dj, input.dj);
        solicitud.dj = dj;
        solicitud.montoDj = dj.montoDj;
      }
    }

    // Procesar Salon
    if (input.salon !== undefined) {
      needsRecalculation = true;
      if (input.salon === null) {
        solicitud.salon = undefined;
        solicitud.montoSalon = undefined;
      } else {
        const salon = await en.findOneOrFail(Salon, input.salon);
        solicitud.salon = salon;
        solicitud.montoSalon = salon.montoS;
      }
    }

    // Procesar Barra
    if (input.barra !== undefined) {
      needsRecalculation = true;
      if (input.barra === null) {
        solicitud.barra = undefined;
        solicitud.montoBarra = undefined;
      } else {
        const barra = await en.findOneOrFail(Barra, input.barra);
        solicitud.barra = barra;
        solicitud.montoBarra = barra.montoB;
      }
    }

    // Procesar Gastronomico
    if (input.gastronomico !== undefined) {
      needsRecalculation = true;
      if (input.gastronomico === null) {
        solicitud.gastronomico = undefined;
        solicitud.montoGastro = undefined;
      } else {
        const gastronomico = await en.findOneOrFail(Gastro, input.gastronomico);
        solicitud.gastronomico = gastronomico;
        solicitud.montoGastro = gastronomico.montoG;
      }
    }

    // Recalcular monto total si es necesario
    if (needsRecalculation) {
      let montoTotal = 0;
      if (solicitud.montoDj) montoTotal += solicitud.montoDj;
      if (solicitud.montoSalon) montoTotal += solicitud.montoSalon;
      if (solicitud.montoBarra) montoTotal += solicitud.montoBarra;
      if (solicitud.montoGastro) montoTotal += solicitud.montoGastro;
      solicitud.montoTotal = montoTotal;
    }

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
