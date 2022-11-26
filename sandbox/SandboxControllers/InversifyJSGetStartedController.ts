import _ from 'lodash';
import debug from 'debug';
import {TYPES} from './types.js';
import {Katana, Ninja, Shuriken} from './entities.js';
import { container } from "./inversify.config";
import { Warrior } from "./interfaces";

export default class InversifyJSGetStartedController {
    run() {
        this._main();
    }

    private _main() {
        // // let ninja1 = new Ninja(new Katana(), new Shuriken());
        // const ninja1 = container.get<Warrior>(TYPES.Warrior);
        // const ninja2 = container.get<Warrior>(TYPES.Warrior);
        //
        // console.log(ninja1);
        // console.log(ninja2);
        // console.log(ninja1.fight());
        // console.log(ninja1.sneak());

        // console.log(container.get<number>(TYPES.ID));
        // console.log(container.get<number>(TYPES.ID));
        // console.log(container.get<number>(TYPES.ID));
        // console.log(container.get<number>(TYPES.ID));
        // console.log(container.get<number>(TYPES.ID));
        // console.log(container.get<number>(TYPES.ID));

        console.log(container.get<Katana>(TYPES.Weapon));
    }
}