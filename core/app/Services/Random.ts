import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';

export default class Random {
    private constructor() {}

    static one<T>(items: T[]): T {
        return items[_.random(0, items.length - 1)];
    }

    /**
     * Возможно исключение тут лишнее и нужно сделать по другому.
     * @param items
     * @param count
     * @param options
     */
    static some<T>(items: T[], count: number, options: {
        unique?: boolean;
    }): T[] {
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