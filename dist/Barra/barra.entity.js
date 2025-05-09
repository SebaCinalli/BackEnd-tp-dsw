var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
export class Barra extends BaseEntity {
    nombre;
    tipoBebida;
    montoB;
    foto;
}
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Barra.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Barra.prototype, "tipoBebida", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], Barra.prototype, "montoB", void 0);
__decorate([
    Property(),
    __metadata("design:type", Array)
], Barra.prototype, "foto", void 0);
//# sourceMappingURL=barra.entity.js.map