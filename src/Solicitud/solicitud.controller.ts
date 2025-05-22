import { Solicitud } from './solicitud.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const en = orm.em;

function sanitizedSolicitudInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    montoDj: req.body.montoDj,
    montoSalon: req.body.montoSalon,
    montosolicitud: req.body.montosolicitud,
    montoGastro: req.body.montoGastro,
    barra: req.body.barra,
    dj: req.body.dj,
    salon: req.body.salon,
    gastronomico: req.body.gastronomico,
    cliente: req.body.cliente,
    fechaSolicitud: req.body.fechaSolicitud,
    estado: req.body.estado
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
    const solicitudes = await en.find(Solicitud, {}, {populate: ['cliente', 'dj', 'salon', 'barra', 'gastronomico']});
    res.status(200).json({message: 'todas las solicitudes encontradas',data: solicitudes,});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const solicitud = await en.findOneOrFail(Solicitud, id,  {populate: ['cliente', 'dj', 'salon', 'barra', 'gastronomico']});
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

async function modify(req: Request, res: Response, next: NextFunction) {
  try{
    const id = Number.parseInt(req.params.id)
    const solicitud = await en.findOneOrFail(Solicitud, id)
    en.assign(solicitud, req.body.sanitizedInput)
    await en.flush()
    res.status(200).json({message: "solicitud modificada"})
  }
  catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id)
    const solicitud = en.getReference(Solicitud, id)
    await en.removeAndFlush(solicitud)
    res.status(200).json({message: "solicitud borrada"})
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedSolicitudInput,findAll, findById, add, modify, remove };
