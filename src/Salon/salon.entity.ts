import { Property, Entity } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';

@Entity()
export class Salon extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre!: string;

  @Property({ nullable: false, unique: true })
  estado!: string;

  @Property({ nullable: false, unique: true })
  montoS!: number;

  @Property()
  foto!: string;

  
}
