import _ from 'lodash';
import {DebugNamespaceID} from './types/enums/DebugNamespaceID.js';
import DebugApp from './app/Services/DebugApp.js';

/**
 * @param target
 * @param message
 */
export function targetIsNilAndReplacedReport(target: any, message?: string) {
    if (_.isNil(target)) {
        message = message ?? 'Целевой объект пустой (null/undefined) и будет заменен нулевыми значениями.';
        DebugApp.debug(DebugNamespaceID.Replace)(message);
    }
}