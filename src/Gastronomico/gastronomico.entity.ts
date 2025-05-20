import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';
import { Zona } from '../Zona/zona.entity.js';

@Entity()
export class Gastro extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombreG!: string;

  @Property({ nullable: false })
  tipoComida!: string;

  @Property({ nullable: false })
  montoG!: number;

  @Property({ unique: true })
  foto!: string;

  @ManyToOne(() => Solicitud, { nullable: false })
  solicitud!: Rel<Solicitud>;

  @ManyToOne(() => Zona, { nullable: false })
    zona!: Rel<Zona>;
}
