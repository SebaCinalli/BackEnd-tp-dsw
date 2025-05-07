
import {Request, Response, NextFunction} from 'express';
import { Character } from './character.entity.js';
import { orm } from '../shared/db/orm.js';

const en = orm.em

en.getRepository(Character)

function sanitizeCharacterInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.body.sanitizedInput = {
      name: req.body.name,
      characterClass: req.body.characterClass,
      level: req.body.level,
      hp: req.body.hp,
      mana: req.body.mana,
      attack: req.body.attack,
      items: req.body.items,
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
        const characters = await en.find(Character, {}, {populate: ['characterClass', 'items']})
        res.status(200).json({message: 'finded all characters', data: characters})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findById(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const character = await en.findOneOrFail(Character, id, {populate: ['characterClass', 'items']})
        res.status(200).json({message: 'finded character', data: character})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req:Request, res: Response) {
    try{
        const character = en.create(Character, req.body.sanitizedInput)
        await en.flush()
        res.status(201).json({message: 'character created succesfully', data: character})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function modify(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const character = await en.findOneOrFail(Character, id)
        en.assign(character, req.body.sanitizedInput)
        await en.flush()
        res.status(200).json({message: 'character updated', data: character})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const character = en.getReference(Character, id)
        en.removeAndFlush(character)
        res.status(200).json({message: 'character deleted'})
    }
    catch(error: any){
        res.status(500).json({message: error.message})    
    }
}


export {sanitizeCharacterInput, findAll, findById, add, modify, remove};
