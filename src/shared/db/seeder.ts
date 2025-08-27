import { EntityManager } from '@mikro-orm/core';
import { Usuario } from '../../Usuario/usuario.entity.js';
import { Zona } from '../../Zona/zona.entity.js';
import { Barra } from '../../Barra/barra.entity.js';
import { Dj } from '../../Dj/dj.entity.js';
import { Gastro } from '../../Gastronomico/gastronomico.entity.js';
import { Salon } from '../../Salon/salon.entity.js';
import bcrypt from 'bcrypt';

export async function seedDatabase(em: EntityManager) {
  console.log('🌱 Iniciando seeding de la base de datos...');

  try {
    // Crear zonas primero (ya que otras entidades dependen de ellas)
    const zonas = await createZonas(em);
    console.log('✅ Zonas creadas');

    // Crear usuarios
    await createUsuarios(em);
    console.log('✅ Usuarios creados');

    // Crear servicios
    await createBarras(em, zonas);
    console.log('✅ Barras creadas');

    await createDjs(em, zonas);
    console.log('✅ DJs creados');

    await createGastronomicos(em, zonas);
    console.log('✅ Servicios gastronómicos creados');

    await createSalones(em, zonas);
    console.log('✅ Salones creados');

    await em.flush();
    console.log('🎉 Seeding completado exitosamente');
  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    throw error;
  }
}

async function createZonas(em: EntityManager): Promise<Zona[]> {
  const zonas = [
    { nombre: 'Centro' },
    { nombre: 'España Y Hospitales' },
    { nombre: 'Norte' },
    { nombre: 'Pichincha' },
  ];

  const zonasEntities = zonas.map((zona) => {
    const nuevaZona = new Zona();
    nuevaZona.nombre = zona.nombre;
    return nuevaZona;
  });

  zonasEntities.forEach((zona) => em.persist(zona));
  await em.flush();

  return zonasEntities;
}

async function createUsuarios(em: EntityManager): Promise<void> {
  // Hash de las contraseñas (ahora con al menos una mayúscula)
  const adminPasswordHash = await bcrypt.hash('Admin123', 10);
  const clientePasswordHash = await bcrypt.hash('Cliente123', 10);

  // Usuario administrador
  const admin = new Usuario();
  admin.nombre = 'Admin';
  admin.apellido = 'Sistema';
  admin.email = 'admin@email.com';
  admin.password = adminPasswordHash;
  admin.telefono = '123456789';
  admin.nombreUsuario = 'admin';
  admin.rol = 'administrador';
  admin.img = 'admin-avatar.jpg';

  // Usuario cliente
  const cliente = new Usuario();
  cliente.nombre = 'Juan';
  cliente.apellido = 'Pérez';
  cliente.email = 'juan.perez@email.com';
  cliente.password = clientePasswordHash;
  cliente.telefono = '987654321';
  cliente.nombreUsuario = 'juanperez';
  cliente.rol = 'usuario';
  cliente.img = 'cliente-avatar.jpg';

  em.persist(admin);
  em.persist(cliente);
}

async function createBarras(em: EntityManager, zonas: Zona[]): Promise<void> {
  const barras = [
    {
      nombreB: 'Barra Premium',
      tipoBebida: 'Cócteles Premium',
      montoB: 15000,
      foto: 'barra-premium.jpg',
      zona: zonas[0], // Zona VIP
    },
    {
      nombreB: 'Barra Central',
      tipoBebida: 'Bebidas Variadas',
      montoB: 8000,
      foto: 'barra-central.jpg',
      zona: zonas[2], // Zona Principal
    },
    {
      nombreB: 'Barra Terraza',
      tipoBebida: 'Tragos Frescos',
      montoB: 10000,
      foto: 'barra-terraza.jpg',
      zona: zonas[1], // Zona Terraza
    },
  ];

  barras.forEach((barraData) => {
    const barra = new Barra();
    barra.nombreB = barraData.nombreB;
    barra.tipoBebida = barraData.tipoBebida;
    barra.montoB = barraData.montoB;
    barra.foto = barraData.foto;
    barra.zona = barraData.zona;
    em.persist(barra);
  });
}

async function createDjs(em: EntityManager, zonas: Zona[]): Promise<void> {
  const djs = [
    {
      nombreArtistico: 'DJ Electro',
      estado: 'Disponible',
      montoDj: 50000,
      foto: 'dj-electro.jpg',
      zona: zonas[0], // Zona VIP
    },
    {
      nombreArtistico: 'DJ Beats',
      estado: 'Disponible',
      montoDj: 35000,
      foto: 'dj-beats.jpg',
      zona: zonas[2], // Zona Principal
    },
    {
      nombreArtistico: 'DJ Sunset',
      estado: 'Disponible',
      montoDj: 40000,
      foto: 'dj-sunset.jpg',
      zona: zonas[1], // Zona Terraza
    },
  ];

  djs.forEach((djData) => {
    const dj = new Dj();
    dj.nombreArtistico = djData.nombreArtistico;
    dj.estado = djData.estado;
    dj.montoDj = djData.montoDj;
    dj.foto = djData.foto;
    dj.zona = djData.zona;
    em.persist(dj);
  });
}

async function createGastronomicos(
  em: EntityManager,
  zonas: Zona[]
): Promise<void> {
  const gastronomicos = [
    {
      nombreG: 'Cocina Gourmet',
      tipoComida: 'Internacional',
      montoG: 25000,
      foto: 'cocina-gourmet.jpg',
      zona: zonas[0], // Zona VIP
    },
    {
      nombreG: 'Snack Bar',
      tipoComida: 'Comida Rápida',
      montoG: 12000,
      foto: 'snack-bar.jpg',
      zona: zonas[2], // Zona Principal
    },
    {
      nombreG: 'Parrilla Terraza',
      tipoComida: 'Parrilla',
      montoG: 18000,
      foto: 'parrilla-terraza.jpg',
      zona: zonas[1], // Zona Terraza
    },
  ];

  gastronomicos.forEach((gastroData) => {
    const gastro = new Gastro();
    gastro.nombreG = gastroData.nombreG;
    gastro.tipoComida = gastroData.tipoComida;
    gastro.montoG = gastroData.montoG;
    gastro.foto = gastroData.foto;
    gastro.zona = gastroData.zona;
    em.persist(gastro);
  });
}

async function createSalones(em: EntityManager, zonas: Zona[]): Promise<void> {
  const salones = [
    {
      nombre: 'Salón VIP',
      estado: 'Disponible',
      montoS: 100000,
      capacidad: 50,
      foto: 'salon-vip.jpg',
      zona: zonas[0], // Zona VIP
    },
    {
      nombre: 'Salón Principal',
      estado: 'Disponible',
      montoS: 60000,
      capacidad: 150,
      foto: 'salon-principal.jpg',
      zona: zonas[2], // Zona Principal
    },
    {
      nombre: 'Salón Terraza',
      estado: 'Disponible',
      montoS: 80000,
      capacidad: 80,
      foto: 'salon-terraza.jpg',
      zona: zonas[1], // Zona Terraza
    },
  ];

  salones.forEach((salonData) => {
    const salon = new Salon();
    salon.nombre = salonData.nombre;
    salon.estado = salonData.estado;
    salon.montoS = salonData.montoS;
    salon.capacidad = salonData.capacidad;
    salon.foto = salonData.foto;
    salon.zona = salonData.zona;
    em.persist(salon);
  });
}
