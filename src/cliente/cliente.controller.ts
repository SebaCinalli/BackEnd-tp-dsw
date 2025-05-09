
import {Request, Response, NextFunction} from 'express';
import { Cliente } from './cliente.entity.js';
import { orm } from '../shared/db/orm.js';

const en = orm.em

en.getRepository(Cliente)

function sanitizeClienteInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.body.sanitizedInput = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      telefono: req.body.telefono,
      nombreUsuario: req.body.nombreUsuario,
      
    }
    //more checks here
  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key]
      }
    })
    next()
  }
  


async function findAll(req:Request, res: Response) {
    try{
        const Clientes = await en.find(Cliente, {})
        res.status(200).json({message: 'finded all Clientes', data: Clientes})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findById(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const cliente = await en.findOneOrFail(Cliente, id)
        res.status(200).json({message: 'finded Cliente', data: cliente})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req:Request, res: Response) {
    try{
        const cliente = en.create(Cliente, req.body.sanitizedInput)
        await en.flush()
        res.status(201).json({message: 'Cliente created succesfully', data: cliente})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function modify(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const cliente = await en.findOneOrFail(Cliente, id)
        en.assign(cliente, req.body.sanitizedInput)
        await en.flush()
        res.status(200).json({message: 'Cliente updated', data: cliente})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const cliente = en.getReference(Cliente, id)
        en.removeAndFlush(Cliente)
        res.status(200).json({message: 'Cliente deleted'})
    }
    catch(error: any){
        res.status(500).json({message: error.message})    
    }
}


export {sanitizeClienteInput, findAll, findById, add, modify, remove};
