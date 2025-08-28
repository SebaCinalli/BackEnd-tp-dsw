import { Zona } from './zona.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const en = orm.em.fork();

function sanitizedZonaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

//en.getRepository(Zona);

async function findAll(req: Request, res: Response) {
  try {
    const Zonas = await en.find(
      Zona,
      {},
      { populate: ['dj', 'salon', 'barra', 'gastro'] }
    );
    res
      .status(200)
      .json({ message: 'todas las zonas encontradas', data: Zonas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const zona = await en.findOneOrFail(Zona, id);
    res.status(200).json({ message: 'zona encontrada', data: zona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const zona = en.create(Zona, req.body.sanitizedInput);
    await en.flush();
    res.status(201).json({ message: 'zona creada', data: zona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const zona = await en.findOneOrFail(Zona, id);
    en.assign(zona, req.body.sanitizedInput);
    await en.flush();
    res.status(200).json({ message: 'zona modificada', data: zona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const zona = en.getReference(Zona, id);
    await en.removeAndFlush(zona);
    res.status(200).json({ message: 'Zona borrada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedZonaInput, findAll, findById, add, modify, remove };
