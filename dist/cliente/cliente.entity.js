var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Property, Entity } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
let Cliente = class Cliente extends BaseEntity {
    nombre;
    apellido;
    email;
    password;
    telefono;
    nombreUsuario;
};
__decorate([
    Property({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "password", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombreUsuario", void 0);
Cliente = __decorate([
    Entity()
], Cliente);
export { Cliente };
//# sourceMappingURL=cliente.entity.js.map