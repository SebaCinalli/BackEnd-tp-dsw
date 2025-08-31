import {
  Entity,
  ManyToOne,
  Property,
  Rel,
  DateTimeType,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Usuario } from '../Usuario/usuario.entity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

@Entity()
export class Solicitud extends BaseEntity {
  @ManyToOne(() => Usuario, { nullable: false })
  usuario!: Rel<Usuario>;

  @ManyToOne(() => Dj, { nullable: true })
  dj?: Rel<Dj>;

  @ManyToOne(() => Salon, { nullable: true })
  salon?: Rel<Salon>;

  @ManyToOne(() => Barra, { nullable: true })
  barra?: Rel<Barra>;

  @ManyToOne(() => Gastro, { nullable: true })
  gastronomico?: Rel<Gastro>;

  @Property({ nullable: false })
  estado!: string;

  @Property({ type: DateTimeType })
  fechaSolicitud = new Date();

  @Property({ type: DateTimeType, nullable: false })
  fechaEvento!: Date;

  @Property({ nullable: true })
  montoDj?: number;

  @Property({ nullable: true })
  montoSalon?: number;

  @Property({ nullable: true })
  montoBarra?: number;

  @Property({ nullable: true })
  montoGastro?: number;

  @Property()
  montoTotal!: number;
}
