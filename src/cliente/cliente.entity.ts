import { Property, Entity, ManyToOne , ManyToMany, Cascade, Rel} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

@Entity()
export class Cliente extends BaseEntity {
  @Property({ length: 255, unique: true })
  nombre!: string;
  
  @Property({ length: 255, unique: true })
  apellido!: string;

  @Property({ length: 255, unique: true })
  email!: string;

  @Property({ length: 255 })
  password!: string;
  
  @Property({ length: 20, unique: true })  // Longitud adecuada para teléfono
  telefono!: string;

  @Property({ length: 50, unique: true, fieldName: 'nombre_usuario' })  // Mapea a snake_case
  nombreUsuario!: string;
}