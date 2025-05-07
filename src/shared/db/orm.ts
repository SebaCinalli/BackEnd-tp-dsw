// src/shared/db/orm.ts
import { MikroORM } from '@mikro-orm/mysql'; // ✅ esto importa el driver implícitamente
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  clientUrl: 'mysql://root:root@localhost:3306/hc4gmo',
  user: 'root',
  password: 'nano1243',
  host: 'localhost',
  port: 3306,
  dbName: 'hc4gmo',
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
  // await generator.dropSchema();
  // await generator.createSchema();
  await generator.updateSchema();
};
