import {orm} from '../shared/db/orm.js'
import {Request, Response} from 'express';
import {CharacterClass} from './characterClass.entity.js';

const en = orm.em

en.getRepository(CharacterClass)

async function findAll(req:Request, res: Response) {
    try{
        const characterClasses = await en.find(CharacterClass,{});
        res.status(200).json({message:'finded all character classes' ,data: characterClasses});
    }
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

async function findById(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const character_class = await en.findOneOrFail(CharacterClass,id)
        res.status(200).json({message: 'finded character class', data: {character_class}})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req:Request, res: Response) {
    try{
        const characterclass = en.create(CharacterClass, req.body) //operador sincronica q no accede a la bdd
        await en.flush()
        res.status(201).json({message: "character class created succesfully", data: characterclass})
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
}

async function modify(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const characterclass = en.getReference(CharacterClass, id)
        en.assign(characterclass, req.body)
        en.flush()
        res.status(200).json({message: 'characte class updated succesfully'}) 
        /*
        const characterclass = await en.upsert(characterClass, req.body)
        res.status(200).json({message: 'characte class updated succesfully', data:{characterclass}})
        */
    }
    catch(error:any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req:Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const characterdeleted = en.getReference(CharacterClass, id)
        await en.removeAndFlush(characterdeleted)
        res.status(200).json({message: 'character class deleted'})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}



export {findAll, findById, add, modify, remove};
