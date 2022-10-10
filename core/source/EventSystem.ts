import debug from 'debug';
import {sprintf} from 'sprintf-js';

export type ListenerType = Readonly<{
    // code: string;
    callback: (target) => void;
    target?: any;
}>

export type listenerCallback = (target) => void;

export default class EventSystem {
    // private _listeners: {[code: string]: ListenerType[]};
    private static _listeners: {[code: string]: ListenerType[]};
    // private static _listeners: {[code: string]: listenerCallback[]};

    private constructor() {
        // EventSystem._listeners = {};
    }

    static create() {
        EventSystem._listeners = {};

        return this;
    }

    // static addListener(codes: string | string[], listener: ListenerType): void {
    // static addListener(codes: string | string[], listener: listenerCallback): void {
    static addListener(options: {
        codes: string | string[],
        listener: ListenerType,
    }): void {
        if (typeof options.codes === 'string') {
            options.codes = [options.codes];
        }

        for (let i = 0; i < options.codes.length; i++) {
            if (!EventSystem._listeners.hasOwnProperty(options.codes[i])) {
                EventSystem._listeners[options.codes[i]] = [];
            }

            EventSystem._listeners[options.codes[i]].push(options.listener);
        }
    }

    static event(code: string, target: any): void {
        debug('log:event_system')(sprintf('Сработало событие: %s', code));
        if (!EventSystem._listeners.hasOwnProperty(code)) {
            return;
        }

        for (let i = 0; i < EventSystem._listeners[code].length; i++) {
            // console.log('target', target);
            // console.log('EventSystem._listeners[code][i].target', EventSystem._listeners[code][i].target);
            // console.log(EventSystem._listeners[code][i].target && EventSystem._listeners[code][i].target === target);
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