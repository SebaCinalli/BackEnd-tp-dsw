import {
  Entity,
  OneToMany,
  Property,
  Collection,
  Cascade
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

@Entity()
export class Zona extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre!: string;

  @OneToMany(() => Gastro, (gastro) => gastro.zona, {cascade: [Cascade.ALL]})
  gastro = new Collection<Gastro>(this);

  @OneToMany(() => Salon, (salon) => salon.zona, {cascade: [Cascade.ALL]})
  salon = new Collection<Salon>(this);

  @OneToMany(() => Barra, (barra) => barra.zona, {cascade: [Cascade.ALL]})
  barra = new Collection<Barra>(this);

  @OneToMany(() => Dj, (dj) => dj.zona, {cascade: [Cascade.ALL]})
  dj = new Collection<Dj>(this);
}
