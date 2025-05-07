"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRepository = void 0;
const character_entity_1 = require("./character.entity");
const characters = [
    new character_entity_1.Character('Gandalf el gris', 1000, 'mago', ['Espada', 'baston']),
    new character_entity_1.Character('frodo', 1, 'hobbit', ['daga', 'anillo'], "b4b3e308-6439-485f-85cd-304c70e15df1")
];
class CharacterRepository {
    findAll() {
        return characters;
    }
    findById(item) {
        return characters.find(c => c.id === item.id);
    }
    add(item) {
        characters.push(item);
        return item;
    }
    modify(item) {
        const characterid = characters.findIndex(c => c.id === item.id);
        if (characterid !== -1) {
            characters[characterid] = { ...characters[characterid], ...item };
        }
        return characters[characterid];
    }
    delete(item) {
        const characterid = characters.findIndex(c => c.id === item.id);
        if (characterid !== -1) {
            const deletedCharacter = characters[characterid];
            characters.splice(characterid, 1);
            return deletedCharacter;
        }
        return undefined;
    }
}
exports.CharacterRepository = CharacterRepository;
