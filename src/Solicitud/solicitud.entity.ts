import { DateType, Entity, Property, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';

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
}
