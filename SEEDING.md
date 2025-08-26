# Sistema de Seeding de Base de Datos

Este proyecto ahora incluye un sistema de seeding que automáticamente poblará la base de datos con datos iniciales cuando se inicie el servidor.

## Datos que se crean automáticamente

### Usuarios

- **Administrador:**

  - Usuario: `admin`
  - Email: `admin@email.com`
  - Contraseña: `Admin123`
  - Rol: administrador

- **Cliente:**
  - Usuario: `juanperez`
  - Email: `juan.perez@email.com`
  - Contraseña: `Cliente123`
  - Rol: usuario

### Zonas (4 instancias)

1. Zona VIP
2. Zona Terraza
3. Zona Principal
4. Zona Exterior

### Barras (3 instancias)

1. **Barra Premium** - Zona VIP - $15,000
2. **Barra Central** - Zona Principal - $8,000
3. **Barra Terraza** - Zona Terraza - $10,000

### DJs (3 instancias)

1. **DJ Electro** - Zona VIP - $50,000
2. **DJ Beats** - Zona Principal - $35,000
3. **DJ Sunset** - Zona Terraza - $40,000

### Servicios Gastronómicos (3 instancias)

1. **Cocina Gourmet** - Zona VIP - $25,000
2. **Snack Bar** - Zona Principal - $12,000
3. **Parrilla Terraza** - Zona Terraza - $18,000

### Salones (3 instancias)

1. **Salón VIP** - Zona VIP - $100,000 (50 personas)
2. **Salón Principal** - Zona Principal - $60,000 (150 personas)
3. **Salón Terraza** - Zona Terraza - $80,000 (80 personas)

## Cómo funciona

### Automático

El seeding se ejecuta automáticamente cada vez que se inicia el servidor (`pnpm run dev` o `pnpm start`), después de que se sincroniza el esquema de la base de datos.

### Manual

Si necesitas ejecutar el seeding manualmente (sin reiniciar todo el servidor), puedes usar:

```bash
pnpm run seed
```

## Notas importantes

1. **Recreación de datos**: El seeding se ejecuta cada vez que se recrea el esquema de la base de datos, por lo que los datos se recrearán automáticamente.

2. **Contraseñas**: Las contraseñas de los usuarios están hasheadas usando bcrypt por seguridad.

3. **Relaciones**: Todas las entidades (barras, DJs, gastronómicos, salones) están correctamente asociadas a sus respectivas zonas.

4. **Personalización**: Puedes modificar los datos iniciales editando el archivo `src/shared/db/seeder.ts`.

## Estructura de archivos

- `src/shared/db/seeder.ts` - Contiene la lógica de seeding
- `src/shared/db/runSeeder.ts` - Script para ejecutar seeding manualmente
- `src/shared/db/orm.ts` - Configuración de ORM con seeding integrado
