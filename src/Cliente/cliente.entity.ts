import {
  Property,
  Entity,
  OneToMany,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';

@Entity()
export class Cliente extends BaseEntity {
  @Property({ length: 255, unique: true, nullable: false })
  nombre!: string;

  @Property({ length: 255, unique: true, nullable: false })
  apellido!: string;

  @Property({ length: 255, unique: true, nullable: false })
  email!: string;

  @Property({ length: 255, nullable: false })
  password!: string;

  @Property({ length: 20, unique: true, nullable: false })
  telefono!: string;

  @Property({
    length: 50,
    unique: true,
    fieldName: 'nombre_usuario',
    nullable: false,
  })
  nombreUsuario!: string;

  @Property({ default: 'cliente' })
  rol?: 'cliente' | 'administrador';

  @Property({ length: 255, nullable: true })
  img?: string;

  @OneToMany(() => Solicitud, (solicitud) => solicitud.cliente, {
    cascade: [Cascade.ALL],
  })
  solicitud = new Collection<Solicitud>(this);
}
