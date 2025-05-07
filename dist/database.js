"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
class Character {
    name;
    level;
    classType;
    inventory;
    id;
    constructor(name, level, classType, inventory, id = node_crypto_1.default.randomUUID()) {
        this.name = name;
        this.level = level;
        this.classType = classType;
        this.inventory = inventory;
        this.id = id;
    }
}
exports.Character = Character;
