import _ from 'lodash';
import debug from 'debug';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class TypescriptSandboxController extends AbstractSandboxController {
    run(): void {
        this._testKeyIteration();
    }

    private _testKeyIteration() {
        enum E {
            One = 'One',
            Two = 'Two',
        }
        type O = {id: number, name: string};
        // type O2 = {[id in E]?: O};


        let oE: {[id in E]?: O} = {
            [E.One]: {id: 10, name: 'this is name'},
            [E.Two]: {id: 20, name: 'this is name'},
        };

        // oE.;
        oE.One.name;
        oE[E.One].name;
        let oKey: E;
        for (oKey in oE) {
        // for (const oKey in oE) {
            // oE.
            // oE[oKey].;
            oE[oKey].name;
            oE[E.One].name;
        }


        let oS: {[key: string]: O} = {
            One: {id: 10, name: 'this is name'},
            Two: {id: 20, name: 'this is name'},
        };

        //Видимо имеется в виду, что key динамический. И можно писать любой. А после key (oS.One.) ключи доступны нормально.
        oS['Three'].name;
        // oS.;
        oS.Two.name;
        oS.Three.name;
        // os['']
        // let oSKey;
        for (const oSKey in oS) {
        // for (oSKey in oS) {
        //     oS[oSKey].;
        }

        let oR = {
            One: {id: 10, name: 'this is name', f: () => {}},
            Two: {id: 20, name: 'this is name', f: () => {}},
        };

        // oR.;
        oR.One.name;
        oR.Two.name;

        for (const oRKey in oR) {
            // oR[oRKey].;
            oR.One.name;
        }

        // let o1: {[key in keyof E]?: O} = {
        //     [E.One]: {},
        // };
    }
}