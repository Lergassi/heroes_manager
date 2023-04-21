import AbstractSandboxController from './AbstractSandboxController.js';

export default class TypescriptSandboxController extends AbstractSandboxController {
    run(): void {
        // this._testKeyIteration();
        this._testTypes();
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

    private _testTypes() {
        // type SomeUnion = 'Foo' | 'Bar' | 'Baz';
        // type SomeUnion1 = keyof SomeUnion;
        //
        // let o: SomeUnion1 = Some;

        enum Door {
            Open = "open",
            Closed = "closed",
            Ajar = "ajar" // half open, half closed
        }

        enum DoorFrame {
            Missing = "noDoor"
        }

        type DoorState = Door | DoorFrame;

        // let a: DoorState = DoorState;

        enum Move {
            LEFT = 'Left',
            RIGHT = 'Right',
            FORWARD = 'Forward',
            BACKWARD = 'Backward'
        }
        const myMove = {
            ...Move,
            JUMP: 'Jump'
        }
        enum Move1 {

        }

        let a = myMove.FORWARD;

        enum Color1 {
            Red = "Red",
            Green = "Green"
        }

        enum Color2 {
            Yellow = "Yellow",
            Blue = "Blue"
        }

        type Colors = Color1 | Color2;
        const Colors = { ...Color2, ...Color1 };

        let color: Colors = Colors.Red;
    }
}