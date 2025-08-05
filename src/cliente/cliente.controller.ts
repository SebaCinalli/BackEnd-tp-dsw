import {Request, Response, NextFunction} from 'express';
import { Cliente } from './cliente.entity.js';
import { orm } from '../shared/db/orm.js';
import bcrypt from 'bcrypt';
import { createToken } from '../shared/jwt.js';
import jwt from 'jsonwebtoken';
import {User} from '../types/User.js';

const en = orm.em

en.getRepository(Cliente)

async function sanitizeClienteInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.sanitizedInput = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: hashedPassword,
      telefono: req.body.telefono,
      nombreUsuario: req.body.nombreUsuario,
      solicitud: req.body.solicitud
      
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

//borrar o lo vamos a usar?
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

async function verifyAndGetProfile(req: Request, res: Response): Promise<void> {
    try {
        
        if (!req.user?.id || isNaN(req.user.id)) {
            res.status(401).json({ message: 'Token inválido - ID no válido' });
            return;
        }
        
        const cliente = await en.findOneOrFail(Cliente, req.user.id);
        res.status(200).json({ 
            message: 'Token válido', 
            user: {
                id: cliente.id,
                email: cliente.email,
                username: cliente.nombreUsuario,
                nombre: cliente.nombre,
                apellido: cliente.apellido
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


async function verifyUser(req:Request, res: Response){
    try{
        const mail = req.body.email
        const password = req.body.password
        if(!mail || !password){
            res.status(400).json({message: "Email y contraseña son requeridos"})
        }
        const cliente = await en.findOne(Cliente, {email: mail})
        if(!cliente){
            res.status(404).json({message: "Cliente no encontrado"})
        }else{
            const isPasswordValid = await bcrypt.compare(password, cliente.password)
            if(!isPasswordValid){
                res.status(400).json({message: "Contraseña incorrecta"})
            }
            const token = await createToken({id: cliente.id, email: cliente.email, username: cliente.nombreUsuario})
            res.cookie("token", token, {httpOnly:true})
            res.status(200).json({message: "Cliente found", 
                email: cliente.email, 
                username: cliente.nombreUsuario,
                id: cliente.id, 
                nombre: cliente.nombre, 
                apellido: cliente.apellido})
        }
    }catch(error: any){
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
        await en.removeAndFlush(cliente)
        res.status(200).json({message: 'Cliente borrado'})
    }
    catch(error: any){
        res.status(500).json({message: error.message})    
    }
}

async function logout(req:Request, res:Response){
    res.cookie("token", "",{
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logout exitoso' })
}




export {sanitizeClienteInput, findAll, findById, add, modify, remove, verifyUser, logout, verifyAndGetProfile};
