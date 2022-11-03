import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../types/enums/DebugNamespaceID.js';
import _ from 'lodash';

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

    // constructor() {
    //     // EventSystem.init();
    // }

    static init(): EventSystem {
        EventSystem._listeners = {};

        return this;
    }

    static addListener(options: {
        codes: string[],
        listener: ListenerType,
    }): void {
        for (let i = 0; i < options.codes.length; i++) {
            if (!EventSystem._listeners.hasOwnProperty(options.codes[i])) {
                EventSystem._listeners[options.codes[i]] = [];
            }

            EventSystem._listeners[options.codes[i]].push(options.listener);
            debug(DebugNamespaceID.EventSystem)(sprintf('Добавлен listener для %s.', options.codes[i]));
        }
    }

    // static addListener(codes: string[], callback: (target) => void): void;
    // static addListener(options: { codes: string[], listener: ListenerType}): void;
    // static addListener(codeOrOptions: string[] | { codes: string | string[], listener: ListenerType}, callback?: (target) => void): void
    // {
    //     if (typeof codeOrOptions === 'object' && !_.isArray(codeOrOptions)) {
    //         let codes = codeOrOptions.codes;
    //         for (let i = 0; i < codes.length; i++) {
    //             if (!EventSystem._listeners.hasOwnProperty(codes[i])) {
    //                 EventSystem._listeners[codes[i]] = [];
    //             }
    //
    //             EventSystem._listeners[codes[i]].push(codeOrOptions.listener);
    //             debug(DebugNamespaceID.EventSystem)(sprintf('Добавлен listener для %s.', _.join(codes, ', ')));
    //         }
    //     } else {
    //         //...
    //     }
    // // static addListener(codes: string | string[], callback: (target) => void): void {
    // }

    static event(code: string, target: any): void {
        debug(DebugNamespaceID.EventSystem)(sprintf('Сработало событие: %s.', code));
        if (!EventSystem._listeners.hasOwnProperty(code)) {
            return;
        }

        for (let i = 0; i < EventSystem._listeners[code].length; i++) {
            //todo: А может ли вообще событие быть без таргета? Пока нет системы рендара и новой системы в замен GameObject - да. Рендер GameObject подписывается на все события в компонентах пока.
            if (EventSystem._listeners[code][i].target) {
                if (EventSystem._listeners[code][i].target === target) {
                    EventSystem._listeners[code][i].callback(target);
                } else {

                }
            } else {
                EventSystem._listeners[code][i].callback(target);
            }
        }
    }
}