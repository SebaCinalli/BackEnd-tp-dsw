import { Solicitud } from './solicitud.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const en = orm.em;

function sanitizedsolicitudInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    montoDj: req.body.montoDj,
    montoSalon: req.body.montoSalon,
    montosolicitud: req.body.montosolicitud,
    montoGastro: req.body.montoGastro,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

en.getRepository(Solicitud);

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const solicitudes = await en.find(Solicitud, {});
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
    const solicitud = await en.findOneOrFail(Solicitud, id);
    res.status(200).json({ message: 'solicitud encontrada', data: solicitud });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    const solicitud = en.create(Solicitud, req.body.sanitizedInput);
    await en.flush();
    res.status(201).json({ message: 'solicitud creada', data: solicitud });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response, next: NextFunction) {}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findById, add, modify, remove };
