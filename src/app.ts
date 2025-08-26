// index.js or app.js
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { UsuarioRouter } from './Usuario/usuario.routes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { BarraRouter } from './Barra/barra.routes.js';
import { SolicitudRouter } from './Solicitud/solicitud.routes.js';
import { DjRouter } from './Dj/dj.routes.js';
import { GastroRouter } from './Gastronomico/gastronomico.routes.js';
import { SalonRouter } from './Salon/salon.routes.js';
import { ZonaRouter } from './Zona/zona.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config({ path: './src/.env' });

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173', // o el puerto de tu frontend
    credentials: true,
  })
);
app.use(express.json()); // Middleware para parsear JSON
app.use(cookieParser()); // Middleware para parsear cookies

// Create MikroORM RequestContext for each request
app.use((req: Request, res: Response, next: NextFunction) => {
  RequestContext.create(orm.em, next);
});

// API Routes
app.use('/api/zona', ZonaRouter);
app.use('/api/dj', DjRouter);
app.use('/api/usuario', UsuarioRouter);
app.use('/api/barra', BarraRouter);
app.use('/api/gastronomico', GastroRouter);
app.use('/api/salon', SalonRouter);
app.use('/api/solicitud', SolicitudRouter);

// 404 handler - should be AFTER all other routes
app.use((_, res: Response) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

// Error handler - should be the last middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Error del servidor', message: err.message });
});

app.use(cors());

async function startServer() {
  try {
    await syncSchema(); // Sync database schema
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}
startServer();
