import { Property, Entity, Cascade, Collection, OneToMany, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';
import { Zona } from '../Zona/zona.entity.js';

@Entity()
export class Salon extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre!: string;

  @Property({ nullable: false })
  estado!: string;

  @Property({ nullable: false })
  montoS!: number;

  @Property({ nullable: false })
  capacidad!: number;

  @Property({ unique: true })
  foto!: string;

  @OneToMany(() => Solicitud, solicitud => solicitud.salon, {cascade: [Cascade.ALL]})
  solicitud = new Collection<Solicitud>(this)

  @ManyToOne(() => Zona, { nullable: false })
  zona!: Rel<Zona>;

}
