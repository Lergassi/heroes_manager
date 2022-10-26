import {Loot, unsigned} from '../../types/types.js';
import ItemLootGeneratorComponent from '../Components/ItemLootGeneratorComponent.js';
import GoldLootGeneratorComponent from '../Components/GoldLootGeneratorComponent.js';
import ExperienceGeneratorComponent from '../Components/ExperienceGeneratorComponent.js';

export default class EnemyEntity {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _loot: Loot[];
    private readonly _exp: unsigned;
    private readonly _gold: unsigned[];

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get loot(): Loot[] {
        return this._loot;
    }

    get exp(): unsigned {
        return this._exp;
    }

    get gold(): unsigned[] {
        return this._gold;
    }

    constructor(
        id: string,
        name: string,
        loot: Loot[],
        exp: unsigned,
        gold: unsigned[],
    ) {
        this._id = id;
        this._name = name;
        this._loot = loot;
        this._exp = exp;
        this._gold = gold;
    }

    createLootGenerator() {
        return new ItemLootGeneratorComponent({
            itemsLoot: this._loot,
        });
    }

    createGoldLootGenerator() {
        return new GoldLootGeneratorComponent({
            min: this._gold[0],
            max: this._gold[1],
        });
    }

    createExperienceLootGenerator() {
        return new ExperienceGeneratorComponent({
            exp: this._exp,
        });
    }
}