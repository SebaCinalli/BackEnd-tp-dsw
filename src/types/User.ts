export type User = {
  email: string;
  id: number;
  username: string;
  rol: 'usuario' | 'administrador';
  nombre: string;
  apellido: string;
  img?: string;
};
