import { Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

export class Barra extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre !: string

    @Property({nullable: false, unique: true})
    tipoBebida !: string

    @Property({nullable: false, unique: true})
    montoB !: number

    @Property()
    foto !: string[]
}