import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Cliente } from '../Cliente/cliente.entity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

@Entity()
export class Solicitud extends BaseEntity {
  @Property({ nullable: false, unique: true })
  montoDj!: number;

  @Property({ nullable: false, unique: true })
  montoSalon!: number;

  @Property({ nullable: false, unique: true })
  montoBarra!: number;

  @Property({ nullable: false, unique: true })
  montoGastro!: number;

  @ManyToOne(() => Cliente, { nullable: false })
  cliente!: Rel<Cliente>;

  @ManyToOne(() => Dj, { nullable: false })
  dj!: Rel<Dj>;

  @ManyToOne(() => Salon, { nullable: false })
  salon!: Rel<Salon>;

  @ManyToOne(() => Barra, { nullable: false })
  barra!: Rel<Barra>;

  @ManyToOne(() => Gastro, { nullable: false })
  gastronomico!: Rel<Gastro>;

  @Property({ nullable: false })
  fechaSolicitud!: Date;

  @Property({ nullable: false })
  estado!: string;
}
