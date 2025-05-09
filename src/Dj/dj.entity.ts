import { Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

export class Dj extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombreArtistico !: string

    @Property({nullable: false, unique: true})
    estado !: string

    @Property({nullable: false, unique: true})
    montoDj !: number

    @Property()
    foto !: string[]
}