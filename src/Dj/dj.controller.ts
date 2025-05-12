import { Dj } from './dj.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const en = orm.em;

function sanitizedDjInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombreArtistico: req.body.nombreArtistico,
    estado: req.body.estado,
    montoDj: req.body.montoDj,
    foto: req.body.foto,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

en.getRepository(Dj);

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const djs = await en.find(Dj, {});
    res.status(200).json({ message: 'todos los dj encontrados', data: djs });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id);
    const dj = await en.findOneOrFail(Dj, id);
    res.status(200).json({ message: 'dj encontrado', data: dj });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response, next: NextFunction) {
  try {
    const dj = en.create(Dj, req.body.sanitizedInput);
    await en.flush();
    res.status(201).json({ message: 'dj creado', data: dj });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function modify(req: Request, res: Response, next: NextFunction) {
  try{

  }
  catch(error: any){
    res.status(500).json({message: error.message})
  }

}


async function remove(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedDjInput, findAll, findById, add, modify, remove };
