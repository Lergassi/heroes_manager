import {DebugNamespaceID} from '../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import DebugApp from '../app/Services/DebugApp.js';

export type EventCallback = (target) => void;

export default class EventSystem2 {
    private static _listeners: { [code: string]: EventCallback[] };

    private constructor() {
    }

    static init(): EventSystem2 {
        EventSystem2._listeners = {};

        return this;
    }

    static addListener(codes: string[], callback: EventCallback): void {
        for (let i = 0; i < codes.length; i++) {
            if (!EventSystem2._listeners.hasOwnProperty(codes[i])) {
                EventSystem2._listeners[codes[i]] = [];
            }

            EventSystem2._listeners[codes[i]].push(callback);
            DebugApp.debug(DebugNamespaceID.EventSystem)(sprintf('Добавлен listener для %s.', codes[i]));
        }
    }

    static event(code: string, target: any): void {
        DebugApp.debug(DebugNamespaceID.EventSystem)(sprintf('Сработало событие: %s.', code));
        if (!EventSystem2._listeners.hasOwnProperty(code)) {
            return;
        }

        for (let i = 0; i < EventSystem2._listeners[code].length; i++) {
            EventSystem2._listeners[code][i](target);
        }
    }
}