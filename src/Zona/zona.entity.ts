import { Entity, OneToMany, Property, Cascade, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Dj } from '../Dj/dj.entity.js';
import { Salon } from '../Salon/salon.entity.js';
import { Barra } from '../Barra/barra.entity.js';
import { Gastro } from '../Gastronomico/gastronomico.entity.js';

@Entity()
export class Zona extends BaseEntity {
  @Property({nullable: false, unique: true})
    nombre !: string
    
  @OneToMany(()=> Dj, dj => dj.solicitud, {cascade: [Cascade.ALL]})
    dj = new Collection<Dj>(this)
  
  @OneToMany(()=> Salon, salon => salon.solicitud, {cascade: [Cascade.ALL]})
    salon = new Collection<Salon>(this)
  
  @OneToMany(()=> Barra, barra => barra.solicitud, {cascade: [Cascade.ALL]})
    barra = new Collection<Barra>(this)
  
  @OneToMany(()=> Gastro, gastro => gastro.solicitud, {cascade: [Cascade.ALL]})
    gastronomico = new Collection<Gastro>(this)
  
}
