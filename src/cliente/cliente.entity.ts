import { Property, Entity, ManyToOne , ManyToMany, Cascade, Rel} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

@Entity()
export class Cliente extends BaseEntity{
  
  @Property({unique: true, nullable: false})
  nombre!: string
  
  @Property({nullable: false, unique: true})
  apellido !: string

  @Property({nullable: false, unique: true})
  email !: string

  @Property({nullable: false, unique: true})
  password!: string
  
  @Property({nullable: false, unique: true})
  telefono !: string

  @Property({nullable: false, unique: true})
  nombreUsuario !: string

}