// src/shared/db/orm.ts
import { MikroORM } from '@mikro-orm/mysql'; // ✅ esto importa el driver implícitamente
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { seedDatabase } from './seeder.js';

export const orm = await MikroORM.init({
  clientUrl: 'mysql://root:root@localhost:3306/TP_DSW_BDD',
  user: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
  dbName: 'TP_DSW_BDD',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.dropSchema(); //si tira algun error sobre el id, descomentar esto y borrar el updateSchema, ejecutar y volver a comentar esto
  await generator.createSchema(); // y poner el update schema
  // await generator.updateSchema()

  // Poblar la base de datos con datos iniciales
  await seedDatabase(orm.em.fork());
};
