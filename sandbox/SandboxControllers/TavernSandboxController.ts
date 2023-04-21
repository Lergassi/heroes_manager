import AbstractSandboxController from './AbstractSandboxController.js';

export default class TavernSandboxController extends AbstractSandboxController {
    run(): void {
        // this._getStarted_v1();
        // this._getStarted_v2(asd);
    }

    // private _getStarted_v1() {
    //     let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
    //     let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);
    //     // let mainHeroList = this.container.get<MainHeroListComponent>(ContainerID.MainHeroList);
    //     let mainHeroList = new MainHeroList(
    //         this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
    //         this.container.get<HeroFactory>(ServiceID.HeroFactory),
    //         3,
    //     );
    //
    //     let tavern = new _Tavern();
    //
    //     tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
    //     tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Rogue), 1);
    //     tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Gunslinger), 1);
    //     tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.FireMage), 1);
    //     tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Archer), 1);
    //     console.log(tavern);
    //
    //     tavern.delete(0);
    //     // tavern.remove(1);
    //     // tavern.remove(1);
    //     // tavern.remove(1);
    //     // console.log(tavern);
    //
    //     tavern.hire(0, heroFactory, mainHeroList);
    //     tavern.hire(0, heroFactory, mainHeroList);
    //     tavern.hire(0, heroFactory, mainHeroList);
    //     tavern.hire(0, heroFactory, mainHeroList);
    //     console.log(tavern);
    //     console.log(mainHeroList);
    // }
}