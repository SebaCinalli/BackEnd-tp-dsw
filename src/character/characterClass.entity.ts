import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection} from '@mikro-orm/core';
import { Character } from './character.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.js';

@Entity()
export class CharacterClass extends BaseEntity{
    @Property({nullable: false, unique: true})
    name!: string
    
    @Property()
    description!: string

    @OneToMany(()=> Character, character => character.characterClass, {cascade:[Cascade.ALL]}) 
    characters = new Collection<Character>(this) 
}