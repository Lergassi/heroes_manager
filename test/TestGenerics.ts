import _ from 'lodash';
import debug from 'debug';

export default class TestGenerics {
    test(): void;
    // static test(foo: string): void
    // static test(foo?: string): void
    test(options: {codes: string | string[], listener: (target) => void}): void;
    // static test(options: {
    //     codes: string | string[],
    //     listener: ListenerType,
    // }): void;
    test(codes: string | string[], callback: (target) => void): void;
    test(codesOrOptions?: string | string[] | {codes: string | string[], listener: (target) => void}, callback?: (target) => void): void
    // static test(codes: string | string[], callback?: (target) => void): void
    // static test(options?: {
    //     codes: string | string[],
    //     listener: ListenerType,
    // }): void
    {
        if (!codesOrOptions) {
            console.log('Без параметров.');
        } else if (callback && (typeof codesOrOptions === 'string' || _.isArray(codesOrOptions))) {
            console.log('Строка или массив.');
        } else {
            console.log('3 вариант с code отдельно.');
        }
    }
}