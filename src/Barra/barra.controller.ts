import { Barra } from './barra.entity.js';
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';

const en = orm.em;

function sanitizedBarraInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    tipoBebida: req.body.tipoBebida,
    montoB: req.body.montoB,
    foto: req.body.foto,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

en.getRepository(Barra);

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const barras = await en.find(Barra, {});
    res
      .status(200)
      .json({ message: 'todas las barras encontradas', data: barras });
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
    const barra = en.create(Barra, req.body.sanitizedInput);
    await en.flush();
    res.status(201).json({ message: 'barra creada', data: barra });
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
