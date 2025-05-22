import { Entity, Property, ManyToOne, OneToMany, Collection, Cascade, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Solicitud } from '../Solicitud/solicitud.entity.js';
import { Zona } from '../Zona/zona.entity.js';

@Entity()
export class Barra extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombreB !: string;

  @Property({ nullable: false })
  tipoBebida!: string;

  @Property({ nullable: false })
  montoB!: number;

  @Property({ unique: true })
  foto!: string;

  @OneToMany(() => Solicitud, (solicitud) => solicitud.barra, { cascade: [Cascade.ALL] })
  solicitud = new Collection<Solicitud>(this);

  @ManyToOne(() => Zona, { nullable: false })
    zona!: Rel<Zona>;
}
