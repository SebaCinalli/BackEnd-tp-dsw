import { Property, ManyToMany, Entity, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import {Character} from './character.entity.js'

@Entity()
export class CharacterItem extends BaseEntity {
    @Property({unique: true, nullable: false})
    name !: string
    
    @Property()
    description !: string
    
    @ManyToMany(() => Character, character => character.items)
    character = new Collection<Character>(this)
}