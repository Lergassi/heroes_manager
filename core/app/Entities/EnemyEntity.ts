import {ItemLoot, unsigned} from '../../types/main.js';
import ItemLootGenerator from '../Components/ItemLootGenerator.js';
import GoldLootGenerator from '../Components/GoldLootGenerator.js';
import ExperienceLootGenerator from '../Components/ExperienceLootGenerator.js';

/**
 * @deprecated Данные лута, силы и тд теперь храняться в бд в виде простых значений и передаются сразу в нужные компоненты. Отображение для игрока делается через отдельный компонент.
 */
export default class EnemyEntity {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _loot: ItemLoot[];
    private readonly _exp: unsigned;
    private readonly _gold: unsigned[];

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get loot(): ItemLoot[] {
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
        loot: ItemLoot[],
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
        // return new ItemLootGeneratorComponent({
        //     itemsLoot: this._loot,
        // });
    }

    createGoldLootGenerator() {
        // return new GoldLootGenerator({
        //     min: this._gold[0],
        //     max: this._gold[1],
        // });
    }

    createExperienceLootGenerator() {
        // return new ExperienceLootGenerator(
        //     this._exp,
        // );
    }
}