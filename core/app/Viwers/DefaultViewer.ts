import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import DebugApp from '../Services/DebugApp.js';

export default class DefaultViewer {
    view(data: object) {
        DebugApp.debug(DebugNamespaceID.Info)(DebugFormatterID.Json, data);
    }
}