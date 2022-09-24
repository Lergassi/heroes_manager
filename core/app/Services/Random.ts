import _ from 'lodash';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';

export type RandomSomeOptions = {
    unique: boolean;
}

export default class Random {
    one<T>(items: T[]): T {
        return items[_.random(0, items.length - 1)];
    }

    /*
        options:
            уникальные. todo: Если count больше items.length то не получиться "выбрать" уникальные значения. Наверное как-по другому нужно сделать и название другое.
     */
    some<T>(items: T[], count: number, options: Partial<RandomSomeOptions> = {}): T[] {
        if (options.unique && items.length < count) {
            throw AppError.itemsNotEnoughForRandomSelection();
        }

        let i = 0;
        let result = [];
        items = [...items];
        while (i < count) {
            if (!items.length) {
                throw AppError.itemsNotEnoughForRandomSelection();
            }

            let item = this.one(items)
            result.push(item);
            if (options.unique) {
                _.pull(items, item);
            }
            ++i;
        }

        return result;
    }

    /**
     *
     * @param chance
     */
    chance(chance: number) {

    }
}