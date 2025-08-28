import { Request, Response, NextFunction } from 'express';
import { Usuario } from './usuario.entity.js';
import { orm } from '../shared/db/orm.js';
import bcrypt from 'bcrypt';
import { createToken } from '../shared/jwt.js';
import { deleteImageFile, replaceImageFile } from '../shared/imageUtils.js';

const en = orm.em.fork();

en.getRepository(Usuario);

//GET ALL

async function findAll(req: Request, res: Response) {
  try {
    const usuarios = await en.find(Usuario, {});
    res.status(200).json({ message: 'finded all usuarios', data: usuarios });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//GET BY ID

async function findById(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = await en.findOneOrFail(Usuario, id);
    res.status(200).json({ message: 'finded usuario', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//VALIDAR SI ESTA LOGUEADO Y OBTENER SU PERFIL

async function verifyAndGetProfile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user?.id || isNaN(req.user.id)) {
      res.status(401).json({ message: 'Token inválido - ID no válido' });
      return;
    }

    const usuario = await en.findOneOrFail(Usuario, req.user.id);
    res.status(200).json({
      message: 'Token válido',
      user: {
        id: usuario.id,
        email: usuario.email,
        username: usuario.nombreUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        img: usuario.img,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//VALIDAR USUARIO EN EL LOGIN Y GENERAR TOKEN

async function verifyUser(req: Request, res: Response) {
  try {
    const mail = req.body.email;
    const password = req.body.password;
    if (!mail || !password) {
      res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
    const usuario = await en.findOne(Usuario, { email: mail });
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Contraseña incorrecta' });
      }
      const token = await createToken({
        id: usuario.id,
        email: usuario.email,
        username: usuario.nombreUsuario,
        rol: usuario.rol,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        img: usuario.img,
      });

      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({
        message: 'Usuario found',
        email: usuario.email,
        username: usuario.nombreUsuario,
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        img: usuario.img,
        rol: usuario.rol,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//AÑADIR USUARIO

async function add(req: Request, res: Response) {
  try {
    const usuario = en.create(Usuario, req.body.sanitizedInput);
    await en.flush();
    res
      .status(200)
      .json({ message: 'Usuario created succesfully', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//MODIFICAR USUARIO

async function modify(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = await en.findOneOrFail(Usuario, id);
    en.assign(usuario, req.body.sanitizedInput);
    await en.flush();
    res.status(200).json({ message: 'Usuario updated', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//BORRAR USUARIO

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    // Primero obtener el usuario para acceder a su imagen
    const usuario = await en.findOneOrFail(Usuario, id);

    // Eliminar la imagen si existe
    if (usuario.img) {
      deleteImageFile('usuarios', usuario.img);
    }

    // Luego eliminar el usuario de la base de datos
    await en.removeAndFlush(usuario);
    res.status(200).json({ message: 'Usuario borrado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//LOGOUT

async function logout(req: Request, res: Response) {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logout exitoso' });
}

//SUBIR IMAGEN

async function uploadImage(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = await en.findOneOrFail(Usuario, id);

    if (!req.file) {
      res.status(400).json({ message: 'No se subió ningún archivo' });
      return;
    }

    // Eliminar imagen anterior si existe
    const oldImage = usuario.img;

    // Actualizar la entidad con el nombre del archivo
    usuario.img = req.file.filename;
    await en.flush();

    // Eliminar la imagen anterior después de guardar la nueva
    if (oldImage) {
      replaceImageFile('usuarios', oldImage, req.file.filename);
    }

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      data: {
        id: usuario.id,
        img: usuario.img,
        imageUrl: `http://localhost:3000/uploads/usuarios/${usuario.img}`,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  findAll,
  findById,
  add,
  modify,
  remove,
  verifyUser,
  logout,
  verifyAndGetProfile,
  uploadImage,
};
