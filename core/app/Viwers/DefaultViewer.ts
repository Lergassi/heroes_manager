import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';

export default class DefaultViewer {
    view(data: object) {
        debug(DebugNamespaceID.Info)(DebugFormatterID.Json, data);
    }
}