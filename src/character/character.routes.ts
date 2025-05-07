import { Router } from "express";
import {findAll, findById, add, modify, remove } from "./character.controler.js";

export const characterRouter = Router();

characterRouter.get('/', findAll);

characterRouter.get('/:id', findById);

characterRouter.post('/', add) 

characterRouter.put('/:id', modify)

characterRouter.patch('/:id', modify) 

characterRouter.delete('/:id', remove);