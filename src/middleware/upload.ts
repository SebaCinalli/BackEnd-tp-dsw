import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Determinar carpeta según la ruta
    let folder = 'general';

    if (req.originalUrl.includes('/usuario')) {
      folder = 'usuarios';
    } else if (req.originalUrl.includes('/dj')) {
      folder = 'djs';
    } else if (req.originalUrl.includes('/barra')) {
      folder = 'barras';
    } else if (req.originalUrl.includes('/salon')) {
      folder = 'salones';
    } else if (req.originalUrl.includes('/gastronomico')) {
      folder = 'gastronomicos';
    }

    cb(null, `public/uploads/${folder}`);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Generar nombre único con timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filtro para tipos de archivo permitidos
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        'Solo se permiten archivos de imagen (jpeg, jpg, png, gif, webp)'
      )
    );
  }
};

// Configuración de multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
  fileFilter: fileFilter,
});

// Middleware específicos para cada entidad
export const uploadUsuario = upload.single('imagen');
export const uploadDj = upload.single('imagen');
export const uploadBarra = upload.single('imagen');
export const uploadSalon = upload.single('imagen');
export const uploadGastronomico = upload.single('imagen');

// Middleware opcionales para cada entidad (para creación sin imagen obligatoria)
export const uploadUsuarioOptional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadUsuario(req, res, (err: any) => {
    // Si hay un error de archivo inesperado, simplemente continúa sin error
    // Esto permite crear sin imagen
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next();
    }
    // Para otros errores (formato inválido, tamaño, etc.), sí pasa el error
    if (err) {
      return next(err);
    }
    next();
  });
};

export const uploadDjOptional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadDj(req, res, (err: any) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next();
    }
    if (err) {
      return next(err);
    }
    next();
  });
};

export const uploadBarraOptional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadBarra(req, res, (err: any) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next();
    }
    if (err) {
      return next(err);
    }
    next();
  });
};

export const uploadSalonOptional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadSalon(req, res, (err: any) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next();
    }
    if (err) {
      return next(err);
    }
    next();
  });
};

export const uploadGastronomicoOptional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadGastronomico(req, res, (err: any) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next();
    }
    if (err) {
      return next(err);
    }
    next();
  });
};
