import { Property, Entity, ManyToOne, Rel } from '@mikro-orm/core';
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
  capacidadS!: number;

  @Property({ unique: true })
  foto!: string;

  @ManyToOne(() => Solicitud, { nullable: false })
  solicitud!: Rel<Solicitud>;

  @ManyToOne(() => Zona, { nullable: false })
  zona!: Rel<Zona>;  

}
