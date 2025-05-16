import { Dj } from './dj.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const em = orm.em.fork();

function sanitizedDjInput(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.sanitizedInput = {
      nombreArtistico: req.body.nombreArtistico,
      estado: req.body.estado,
      montoDj: req.body.montoDj,
      foto: req.body.foto,
      solicitud: req.body.solicitud,
    };

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
    console.log("findAll llamado");
    const djs = await em.find(Dj, {});
    console.log("Found DJs:", djs);
    res.status(200).json({ message: 'todos los dj encontrados', data: djs });
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
    const dj = em.create(Dj, req.body.sanitizedInput);
    await em.flush()
    res.status(201).json({ message: 'dj creado', data: dj });
  }catch (error: any) {
    res.status(500).json({message:error.message})
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
    const dj = em.getReference(Dj, id);
    await em.removeAndFlush(dj);
    res.status(200).json({ message: 'DJ eliminado' });
  } catch (error: any) {
    next(error);
  }
}

export { sanitizedDjInput, findAll, findById, add, modify, remove };