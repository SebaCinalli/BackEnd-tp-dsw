import { Property, Entity, ManyToOne , ManyToMany, Cascade, Rel} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { CharacterClass } from "./characterClass.entity.js";
import { CharacterItem } from "./characterItem.entity.js";

@Entity()
export class Character extends BaseEntity{
  
  @Property({unique: true, nullable: false})
  name!: string
  
  @Property({nullable: false})
  level !: number

  @Property()
  hp !: number

  @Property()
  mana!: number
  
  @Property()
  attack !: number
  
  @ManyToOne(() => CharacterClass,{nullable: false})
  characterClass !:  Rel<CharacterClass>

  @ManyToMany(() => CharacterItem, item => item.character, {cascade: [Cascade.ALL], owner: true})
  items !: string[]
}