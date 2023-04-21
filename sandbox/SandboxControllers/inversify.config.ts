import {Container, interfaces} from 'inversify';
import {TYPES} from './types';
import {ThrowableWeapon, Warrior, Weapon} from './interfaces';
import {Katana, Ninja, Shuriken} from './entities';

const container = new Container();

let _counter = 1;

function id(): number {
    return _counter++;
}

// myContainer.bind<() => number>(TYPES.ID).toFunction(() => {
//     return _counter++;
// });
// myContainer.bind<number>(TYPES.ID).toConstantValue(_.random(1,100));
// myContainer.bind<number>(TYPES.ID).toConstantValue(id());
// container.bind<number>(TYPES.ID).toDynamicValue((context: interfaces.Context) => { return _counter++; });
container.bind<number>(TYPES.ID).toDynamicValue((context: interfaces.Context) => { return id(); });

container.bind<Warrior>(TYPES.Warrior).to(Ninja);
// myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<Weapon>(TYPES.Weapon).to(Katana).inSingletonScope();
// myContainer.bind<Katana>(TYPES.Weapon).toConstantValue(new Katana());
// myContainer.bind<Katana>(TYPES.Weapon).toDynamicValue((context: interfaces.Context) => { return new Katana(); });
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { container };