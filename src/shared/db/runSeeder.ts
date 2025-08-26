// Script para ejecutar el seeding manualmente
import { orm } from './orm.js';
import { seedDatabase } from './seeder.js';

async function runSeeder() {
  try {
    console.log('🔄 Conectando a la base de datos...');

    // Poblar la base de datos
    await seedDatabase(orm.em.fork());

    console.log('✅ Seeding completado exitosamente');
  } catch (error) {
    console.error('❌ Error ejecutando el seeder:', error);
  } finally {
    await orm.close();
  }
}

runSeeder();
