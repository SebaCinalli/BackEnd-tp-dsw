import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';


export async function sanitizeUserInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const saltRounds = 10;
    let hashedPassword = undefined;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    }
    
    req.body.sanitizedInput = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: hashedPassword,
      telefono: req.body.telefono,
      nombreUsuario: req.body.nombreUsuario,
      solicitud: req.body.solicitud,
      rol: req.body.rol,
      img: req.body.img,
      ...(hashedPassword && { password: hashedPassword })
    }
    
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key]
      }
    })
    
    next()
}