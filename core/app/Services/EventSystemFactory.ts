import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import EventSystem from '../../source/EventSystem.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class EventSystemFactory {
    // // addListener(target: any | EventSubscriberInterface, codes: string | string[], rComponent: RC, stateOptions: string[]): void {
    // //
    // // }
    // // addListener<RC extends React.Component>(codes: string | string[], rComponent: RC, stateOptions: string[]): void;
    // addRenderListener<RC extends React.Component>(target: EventSubscriberInterface | any, codes: string[], rComponent: RC, stateOptions: string[]): void {
    // // addListener<RC extends React.Component>(codes: string | string[], rComponent: RC, stateOptions: string[], target: any | EventSubscriberInterface): void {
    //     let callback = (target) => {
    //         rComponent.setState((state) => {
    //             let _stateOptions = {};
    //             for (let i = 0; i < stateOptions.length; i++) {
    //                 _stateOptions[stateOptions[i]] = state[stateOptions[i]];
    //             }
    //
    //             return _stateOptions;
    //         });
    //     };
    //
    //     if (target.addListener) {
    //         target.addListener(codes, callback);
    //         debug(DebugNamespaceID.Debug)('Сработала регистрация события с интерфейсом EventSubscriberInterface.');
    //     } else {
    //         EventSystem.addListener({
    //             codes: codes,
    //             listener: {
    //                 callback: callback,
    //                 target: target,
    //             },
    //         });
    //         debug(DebugNamespaceID.Debug)('Сработала регистрация события БЕЗ интерфейса EventSubscriberInterface.');
    //     }
    // }
}