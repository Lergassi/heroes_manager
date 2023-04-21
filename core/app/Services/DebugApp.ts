import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import MessageHistoryRC from '../../../client/public/RC/MessageHistoryRC.js';
import {ServiceID} from '../../types/enums/ServiceID.js';

//@indev Временное решение для отображение сообщений в чате для демо и скриншотов.
export default class DebugApp {
    // get container(): ContainerInterface {
    //     return this._container;
    // }
    //
    // set container(value: ContainerInterface) {
    //     this._container = value;
    // }
    // static debug(namespace: string) {
    //     return debug(namespace);
    // }

    static container: ContainerInterface;

    __() {
        DebugApp.debug(DebugNamespaceID.Log)(42);
    }

    // static debug(namespace: string) {
    //     return (() => {
    //         console.log('asdadas');
    //         return debug(namespace);
    //     })();
    // }

    static debug(namespace: string) {
        return (formatter: any, ...args: any[]) => {
            if (debug.enabled(namespace)) {
                if (args.length) {

                } else {
                    DebugApp.container?.get<MessageHistoryRC>(ServiceID.UI_MessageHistory)?.add(formatter);
                }
            }

            debug(namespace)(formatter, ...args);
        };
    }

    // static log(namespace: string, ...args: any[]) {
    //     console.log(args);
    //
    //     debug(namespace)(...args);
    // }

    static format(formatter: string) {
        return this;
    }
}