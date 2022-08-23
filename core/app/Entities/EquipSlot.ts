import EquipSlotRule from './EquipSlotRule.js';
import Item from './Item.js';

export default class EquipSlot {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _sort: number;
    private readonly _rules: EquipSlotRule[];

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get alias(): string {
        return this._alias;
    }

    get description(): string {
        return this._description;
    }

    get sort(): number {
        return this._sort;
    }

    get rules(): EquipSlotRule[] {
        return this._rules;
    }

    constructor(
        id: string,
        name: string,
        alias: string,
        description: string,
        sort: number,
        rules: EquipSlotRule[],
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._sort = sort;
        this._rules = rules;
    }

    availableItemForEquip(item: Item): boolean {
        for (let i = 0; i < this.rules.length; i++) {
            if (this.rules[i].availableItemForEquip(item)) {
                return true;
            }
        }

        return false;
    }
}