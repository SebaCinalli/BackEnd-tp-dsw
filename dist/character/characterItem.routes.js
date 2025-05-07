import { findAll, findById, add, modify, remove } from './characterItem.controler.js';
import { Router } from 'express';
export const characterItemRouter = Router();
characterItemRouter.get('/', findAll);
characterItemRouter.get('/:id', findById);
characterItemRouter.get('/', add);
characterItemRouter.get('/:id', modify);
characterItemRouter.get('/:id', remove);
//# sourceMappingURL=characterItem.routes.js.map