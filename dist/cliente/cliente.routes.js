import { Router } from "express";
import { findAll, findById, add, modify, remove } from "./cliente.controler.js";
export const ClienteRouter = Router();
ClienteRouter.get('/', findAll);
ClienteRouter.get('/:id', findById);
ClienteRouter.post('/', add);
ClienteRouter.put('/:id', modify);
ClienteRouter.patch('/:id', modify);
ClienteRouter.delete('/:id', remove);
//# sourceMappingURL=cliente.routes.js.map