import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';

@Entity()
export class Zona extends BaseEntity {
  @Property({ length: 255, nullable: false, unique: true })
  nombreZ!: string;
  // @OneToMany(() => Zona, (zona) => zona.nombreZ, { cascade: [Cascade.ALL] })
  // zonas = new Collection<Zona>(this);
}
