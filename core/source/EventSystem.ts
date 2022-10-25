import debug from 'debug';
import {sprintf} from 'sprintf-js';

export type ListenerType = Readonly<{
    // code: string;
    callback: (target) => void;
    target?: any;
    // target: any;
}>

export type listenerCallback = (target) => void;

export default class EventSystem {
    private static _listeners: {[code: string]: ListenerType[]};

    private constructor() {}

    static init(): EventSystem {
        EventSystem._listeners = {};

        return this;
    }

    static addListener(options: {
        codes: string | string[],
        listener: ListenerType,
    }): void {
        let codes = typeof options.codes === 'string' ? [options.codes] : options.codes;
        for (let i = 0; i < codes.length; i++) {
            if (!EventSystem._listeners.hasOwnProperty(codes[i])) {
                EventSystem._listeners[codes[i]] = [];
            }

            EventSystem._listeners[codes[i]].push(options.listener);
        }
    }

    static event(code: string, target: any): void {
        debug('log:event_system')(sprintf('Сработало событие: %s', code));
        if (!EventSystem._listeners.hasOwnProperty(code)) {
            return;
        }

        for (let i = 0; i < EventSystem._listeners[code].length; i++) {
            //todo: А может ли вообще событие быть без таргета? Пока нет системы рендара и новой системы в замен GameObject - да. Рендер GameObject подписывается на все события в компонентах пока.
            if (EventSystem._listeners[code][i].target) {
                if (EventSystem._listeners[code][i].target === target) {
                    EventSystem._listeners[code][i].callback(target);
                }
            } else {
                EventSystem._listeners[code][i].callback(target);
            }
        }
    }
}