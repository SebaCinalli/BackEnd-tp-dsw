import { Gastro } from "./gastronomico.entity.js";
import {Request, Response, NextFunction} from 'express'
import { orm } from "../shared/db/orm.js";

const en = orm.em

function sanitizedGastronomicoInput(req:Request, res:Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        tipoComida: req.body.tipoComida,
        montoG: req.body.montoG,
        foto: req.body.foto,
        solicitud: req.body.solicitud
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key]
      }
    })
    next()
}


en.getRepository(Gastro)

async function findAll(req:Request, res: Response, next: NextFunction){
    try{
        const gastronom = await en.find(Gastro, {})
        res.status(200).json({message: 'todas los gastronomicos encontrados', data: gastronom})
    }
    catch(error:any){
        res.status(500).json({message: error.message})
    }
}


async function findById(req:Request, res:Response, next: NextFunction){
    try{
        const id = Number.parseInt(req.params.id)
        const gastro = await en.findOneOrFail(Gastro, id)
        res.status(200).json({message: 'gastronomico encontrado', data: gastro})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}


async function add(req:Request, res: Response, next: NextFunction){
    try{
        const gastro = en.create(Gastro, req.body.sanitizedInput)
        await en.flush()
        res.status(201).json({message:'gastronomico creada', data: gastro})
    }
    catch(error:any){
        res.status(500).json({message: error.message})
    }
}


async function modify(req:Request, res:Response, next: NextFunction){
    try{
        const id = Number.parseInt(req.params.id)
        const gastro = await en.findOneOrFail(Gastro, id)
        en.assign(gastro, req.body.sanitizedInput)
        await en.flush()
        res.status(200).json({message: "gastronomico actualizado"})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req:Request, res: Response, next: NextFunction){
    try{
        const id = Number.parseInt(req.params.id)
        const gastro = en.getReference(Gastro, id)
        await en.removeAndFlush(gastro)
        res.status(200).json({message: "gastronomico borrado"})
    }
    catch(error:any){
        res.status(500).json({message: error.message})
    }
}




export{sanitizedGastronomicoInput,findAll, findById, add, modify, remove}