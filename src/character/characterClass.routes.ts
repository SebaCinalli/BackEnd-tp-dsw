import { Router } from "express";
import {findAll, findById, add, modify, remove } from "./characterClass.controler.js";

export const characterClassRouter = Router();

characterClassRouter.get('/', findAll);

characterClassRouter.get('/:id', findById);

characterClassRouter.post('/', add) 

characterClassRouter.put('/:id', modify)

characterClassRouter.delete('/:id', remove);