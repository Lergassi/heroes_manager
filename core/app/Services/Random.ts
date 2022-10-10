import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';

export type RandomSomeOptions = {
    unique: boolean;
}

export default class Random {
    private constructor() {}

    static one<T>(items: T[]): T {
        return items[_.random(0, items.length - 1)];
    }

    /*
        options:
            уникальные. todo: Если count больше items.length то не получиться "выбрать" уникальные значения. Наверное как-по другому нужно сделать и название другое.
     */
    static some<T>(items: T[], count: number, options: Partial<RandomSomeOptions> = {}): T[] {
        if (options.unique && items.length < count) {
            throw AppError.itemsNotEnoughForRandomSelection();
        }

        let i = 0;
        let result = [];
        let copyItems = [...items];
        while (i < count) {
            if (!copyItems.length) {
                throw AppError.itemsNotEnoughForRandomSelection();
            }

            let item = this.one(copyItems)
            result.push(item);
            if (options.unique) {
                _.pull(copyItems, item);
            }
            ++i;
        }

        return result;
    }

    static oneFromRange(min: number, max: number) {

    }
}