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

  @ManyToOne(() => Dj, { nullable: false })
  dj!: Rel<Dj>;

  @ManyToOne(() => Salon, { nullable: false })
  salon!: Rel<Salon>;

  @ManyToOne(() => Barra, { nullable: false })
  barra!: Rel<Barra>;

  @ManyToOne(() => Gastro, { nullable: false })
  gastronomico!: Rel<Gastro>;

  @Property({ nullable: false })
  estado!: string;

  @Property({ type: DateTimeType })
  fechaSolicitud = new Date();

  @Property()
  montoDj!: number;

  @Property()
  montoSalon!: number;

  @Property()
  montoBarra!: number;

  @Property()
  montoGastro!: number;

  @Property()
  montoTotal!: number;
}
