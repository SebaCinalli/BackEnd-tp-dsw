import { Salon } from './salon.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const en = orm.em;

function sanitizedSalonInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    estado: req.body.tipoBebida,
    montoS: req.body.montoB,
    foto: req.body.foto,
    solcitud: req.body.solicitud
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
  try{
    const id = Number.parseInt(req.params.id)
    const salon = await en.findOneOrFail(Salon, id)
    en.assign(salon, req.body.sanitizedInput)
    await en.flush()
    res.status(200).json({message: "salon actualizado"})
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id)
    const salon = en.getReference(Salon, id)
    await en.removeAndFlush(salon)
    res.status(200).json({message: "salon borrado"})
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedSalonInput, findAll, findById, add, modify, remove };
