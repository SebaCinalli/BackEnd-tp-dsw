import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';

@Entity()
export class Barra extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre!: string;

  @Property({ nullable: false })
  tipoBebida!: string;

  @Property({ nullable: false })
  montoB!: number;

  @Property({ unique: true })
  foto!: string;

  @ManyToOne(() => Solicitud, { nullable: false })
  solicitud!: Rel<Solicitud>;
}
