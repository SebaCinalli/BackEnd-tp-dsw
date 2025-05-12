import { Cascade, Collection, Entity, OneToMany, Property, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Cliente } from '../cliente/cliente.entity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

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
  
  @OneToMany(()=> Cliente, cliente => cliente.solicitud, {cascade: [Cascade.ALL]})
  clientes = new Collection<Cliente>(this)

  @OneToMany(()=> Dj, dj => dj.solicitud, {cascade: [Cascade.ALL]})
  dj = new Collection<Dj>(this)

  @OneToMany(()=> Salon, salon => salon.solicitud, {cascade: [Cascade.ALL]})
  salon = new Collection<Salon>(this)

  @OneToMany(()=> Barra, barra => barra.solicitud, {cascade: [Cascade.ALL]})
  barra = new Collection<Barra>(this)

  @OneToMany(()=> Gastro, gastro => gastro.solicitud, {cascade: [Cascade.ALL]})
  gastronomico = new Collection<Gastro>(this)
}
