 // dj.entity.js
import { Entity, Property, OneToMany, Collection, ManyToOne, Rel, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';
import { Zona } from '../Zona/zona.entity.js';

@Entity()
export class Dj extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombreArtistico!: string;

  @Property({ nullable: false })
  estado!: string;

  @Property({ nullable: false })
  montoDj!: number;

  @Property({ nullable: true, unique: true })
  foto?: string;

  @OneToMany(() => Solicitud, solicitud => solicitud.dj, {cascade: [Cascade.ALL]})
  solicitud = new Collection<Solicitud>(this)

  @ManyToOne(() => Zona, { nullable: false })
  zona!: Rel<Zona>;
}