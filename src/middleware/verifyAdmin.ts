import {Request, Response, NextFunction} from 'express';

import {User} from '../types/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}



export function verifyAdmin(req: Request, res: Response, next: NextFunction): void {
  const rol = req.user?.rol
  try {
    if(rol !== 'administrador'){
        res.status(403).json({message: 'no autorizado'})
        return;
    }
    next();
  } catch (error: any) {
    res.status(403).json({ message: '', error: error.message });
    return;
  }
}