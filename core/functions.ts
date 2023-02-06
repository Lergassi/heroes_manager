import debug from 'debug';
import _ from 'lodash';
import {DebugNamespaceID} from './types/enums/DebugNamespaceID.js';

/**
 * @param target
 * @param message
 */
export function targetIsNilAndReplacedReport(target: any, message?: string) {
    if (_.isNil(target)) {
        message = message ?? 'Целевой объект пустой (null/undefined) и будет заменен нулевыми значениями.';
        debug(DebugNamespaceID.Replace)(message);
    }
}