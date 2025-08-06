export type User = {
  email: string;
  id: number;
  username: string;
  rol: 'cliente' | 'administrador';
  nombre: string;
  apellido: string;
  img?: string;
};