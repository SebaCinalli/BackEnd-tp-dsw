import {
  Entity,
  Property,
  OneToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
} from '@mikro-orm/core';
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

  @Property({ nullable: true, unique: true })
  foto?: string;

  @OneToMany(() => Solicitud, (solicitud) => solicitud.gastronomico, {
    cascade: [Cascade.ALL],
  })
  solicitud = new Collection<Solicitud>(this);

  @ManyToOne(() => Zona, { nullable: false })
  zona!: Rel<Zona>;
}
