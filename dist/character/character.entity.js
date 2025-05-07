var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Property, Entity, ManyToOne, ManyToMany, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { CharacterClass } from "./characterClass.entity.js";
import { CharacterItem } from "./characterItem.entity.js";
let Character = class Character extends BaseEntity {
    name;
    level;
    hp;
    mana;
    attack;
    characterClass;
    items;
};
__decorate([
    Property({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Character.prototype, "level", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Character.prototype, "hp", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Character.prototype, "mana", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Character.prototype, "attack", void 0);
__decorate([
    ManyToOne(() => CharacterClass, { nullable: false }),
    __metadata("design:type", Object)
], Character.prototype, "characterClass", void 0);
__decorate([
    ManyToMany(() => CharacterItem, item => item.character, { cascade: [Cascade.ALL], owner: true }),
    __metadata("design:type", Array)
], Character.prototype, "items", void 0);
Character = __decorate([
    Entity()
], Character);
export { Character };
//# sourceMappingURL=character.entity.js.map