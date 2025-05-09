import { Router } from "express";
import {findAll, findById, add, modify, remove } from "./cliente.controller.js";

export const ClienteRouter = Router();

ClienteRouter.get('/', findAll);

ClienteRouter.get('/:id', findById);

ClienteRouter.post('/', add) 

ClienteRouter.put('/:id', modify)

ClienteRouter.patch('/:id', modify) 

ClienteRouter.delete('/:id', remove);