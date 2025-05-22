// index.js or app.js
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { ClienteRouter } from './cliente/cliente.routes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { BarraRouter } from './Barra/barra.routes.js';
import { SolicitudRouter } from './Solicitud/solicitud.routes.js';
import { DjRouter } from './Dj/dj.routes.js';
import { GastroRouter } from './Gastronomico/gastronomico.routes.js';
import { SalonRouter } from './Salon/salon.routes.js';
import { ZonaRouter } from './Zona/zona.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Create MikroORM RequestContext for each request
app.use((req: Request, res: Response, next: NextFunction) => {
  RequestContext.create(orm.em, next);
});

// API Routes
app.use('/api/dj', DjRouter);
app.use('/api/cliente', ClienteRouter);
app.use('/api/barra', BarraRouter);
app.use('/api/gastronomico', GastroRouter);
app.use('/api/salon', SalonRouter);
app.use('/api/solicitud', SolicitudRouter);
app.use('/api/zona', ZonaRouter);

// 404 handler - should be AFTER all other routes
app.use((_, res: Response) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

// Error handler - should be the last middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Error del servidor', message: err.message });
});

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
