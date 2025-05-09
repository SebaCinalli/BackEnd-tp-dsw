import { Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

export class Gastro extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre !: string

    @Property({nullable: false, unique: true})
    tipoComida !: string

    @Property({nullable: false, unique: true})
    montoG !: number

    @Property()
    foto !: string[]
}