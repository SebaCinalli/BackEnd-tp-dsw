import 'reflect-metadata'; 
import express from 'express';
import { characterRouter } from './character/character.routes.js'; // Asegúrate de que la ruta sea correcta
import { characterClassRouter } from './character/characterClass.routes.js'; // Asegúrate de que la ruta sea correcta
import {orm, syncSchema} from './shared/db/orm.js'; 
import { RequestContext } from '@mikro-orm/core';
import { characterItemRouter } from './character/characterItem.routes.js';



const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las peticiones

//luego de los middleware base como express.json() o cors 

app.use((req, res, next) => {
  RequestContext.create(orm.em, next); // Crea un contexto de solicitud para MikroORM. 
  //sirve para que cada request tenga su propio contexto de base de datos y no se mezclen las transacciones
  //esto es necesario para que MikroORM funcione correctamente en un entorno de servidor
  // siempre se ejecuta antes de las rutas y middlewares de negocio
})

// antes de las rutas y middlewares de negocio

app.use('/api/characters/classes', characterClassRouter);
app.use('/api/characters', characterRouter);// Asegúrate de que la ruta sea correcta
app.use('/api/characters/items', characterItemRouter)

app.use((_,res) =>{
  res.status(404).send({error: 'Ruta no encontrada'});
})


await syncSchema(); // Sincroniza el esquema de la base de datos al iniciar el servidor. solo en desarrollo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

