import { Entity, Property, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';
import { Zona } from '../Zona/zona.entity.js';

@Entity()
export class Gastro extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombreG !: string;

  @Property({ nullable: false })
  tipoComida!: string;

  @Property({ nullable: false })
  montoG!: number;

  @Property({ unique: true })
  foto!: string;

  @OneToMany(() => Solicitud, solicitud => solicitud.gastronomico, {cascade: [Cascade.ALL]})
  solicitud = new Collection<Solicitud>(this)
  
    @OneToMany(() => Zona, zona => zona.gastronomico, {cascade: [Cascade.ALL]})
  zona = new Collection<Zona>(this)
}
