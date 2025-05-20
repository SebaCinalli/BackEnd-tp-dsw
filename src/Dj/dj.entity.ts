 // dj.entity.js
import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
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

  @ManyToOne(() => Solicitud, { nullable: true }) 
  solicitud?: Rel<Solicitud>;

  @ManyToOne(() => Zona, { nullable: false })
    zona!: Rel<Zona>;
}