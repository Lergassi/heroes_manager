import {injectable, inject, interfaces} from "inversify";
import "reflect-metadata";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
import { TYPES } from "./types";

@injectable()
class Katana implements Weapon {
    private _ID: number;
    private _damage: number;
    private _hits: number = 0;

    constructor(
        // @inject(TYPES.ID) ID: number,
        // damage: number = 42,
        damage: number,
    )
    {
        // console.log(ID);
        console.log(damage);
    // constructor(damage: number) {
        this._damage = damage;
        // this._damage = 42;
    }

    public hit() {
        ++this._hits;

        return "cut " + this._damage;
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@injectable()
class Ninja implements Warrior {

    private _katana: Weapon;
    private _shuriken: ThrowableWeapon;

    public constructor(
        @inject(TYPES.Weapon) katana: Weapon,
        @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }

}
// @injectable()
// class Ninja implements Ninja {
//
//     private _katana: Katana;
//     private _shuriken: Shuriken;
//
//     public constructor(
//         @inject("Newable<Katana>") Katana: interfaces.Newable<Katana>,
//         @inject("Shuriken") shuriken: Shuriken
//     ) {
//         this._katana = new Katana();
//         this._shuriken = shuriken;
//     }
//
//     public fight() { return this._katana.hit(); };
//     public sneak() { return this._shuriken.throw(); };
//
// }

export { Ninja, Katana, Shuriken };