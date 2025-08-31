import { orm } from './db/orm.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';

const em = orm.em.fork();

/**
 * Obtiene los IDs de servicios reservados para una fecha específica
 * @param fecha Fecha en formato DD/MM/YYYY
 * @param tipoServicio Tipo de servicio: 'dj', 'salon', 'barra', 'gastronomico'
 * @returns Array de IDs de servicios reservados
 */
export async function obtenerServiciosReservados(
  fecha: string,
  tipoServicio: 'dj' | 'salon' | 'barra' | 'gastronomico'
): Promise<number[]> {
  try {
    // Convertir fecha del formato DD/MM/YYYY a Date
    const [day, month, year] = fecha.split('/');
    const fechaBusqueda = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    // Normalizar la fecha para buscar todo el día
    const fechaInicio = new Date(fechaBusqueda);
    fechaInicio.setHours(0, 0, 0, 0);

    const fechaFin = new Date(fechaBusqueda);
    fechaFin.setHours(23, 59, 59, 999);

    // Construir el filtro dinámicamente
    const filtro: any = {
      fechaEvento: {
        $gte: fechaInicio,
        $lte: fechaFin,
      },
    };

    // Agregar filtro para que el servicio no sea null
    filtro[tipoServicio] = { $ne: null };

    // Buscar solicitudes que coincidan con la fecha del evento y tengan el servicio especificado
    const solicitudes = await em.find(Solicitud, filtro, {
      populate: [tipoServicio],
    });

    // Extraer los IDs de los servicios reservados
    const idsReservados: number[] = [];
    for (const solicitud of solicitudes) {
      const servicio = solicitud[tipoServicio as keyof Solicitud] as any;
      if (servicio && servicio.id) {
        idsReservados.push(servicio.id);
      }
    }

    return idsReservados;
  } catch (error) {
    console.error(
      `Error al obtener servicios reservados para ${tipoServicio}:`,
      error
    );
    return [];
  }
}

/**
 * Convierte una fecha de string DD/MM/YYYY a Date
 * @param fechaString Fecha en formato DD/MM/YYYY
 * @returns Date object
 */
export function convertirFecha(fechaString: string): Date {
  const [day, month, year] = fechaString.split('/');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
