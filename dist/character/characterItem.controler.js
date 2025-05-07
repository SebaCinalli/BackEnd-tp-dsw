import { orm } from '../shared/db/orm.js';
import { CharacterItem } from './characterItem.entity.js';
const en = orm.em;
en.getRepository(CharacterItem);
async function findAll(req, res) {
    try {
        const characteritems = await en.find(CharacterItem, {});
        res.status(200).json({ message: 'finded all character items', data: characteritems });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findById(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const characteritems = await en.findOneOrFail(CharacterItem, id);
        res.status(200).json({ message: 'finded character item', data: characteritems });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const characteritem = en.create(CharacterItem, req.body);
        await en.flush();
        res.status(201).json({ message: 'character created succesfully', data: characteritem });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function modify(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const characteritem = en.getReference(CharacterItem, id);
        en.assign(characteritem, req.body);
        await en.flush();
        res.status(200).json({ message: 'character item updated' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const characteritem = en.getReference(CharacterItem, id);
        en.removeAndFlush(characteritem);
        res.status(200).json({ message: 'character item deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findById, add, modify, remove };
//# sourceMappingURL=characterItem.controler.js.map