import _ from 'lodash';
import debug from 'debug';
import AbstractSandboxController from './AbstractSandboxController.js';
import Tavern from '../../core/app/Components/Tavern.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import MainHeroList from '../../core/app/Components/MainHeroList.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';

export default class TavernSandboxController extends AbstractSandboxController {
    run(): void {
        this._getStarted();
    }

    private _getStarted() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);
        // let mainHeroList = this.container.get<MainHeroListComponent>(ContainerID.MainHeroList);
        let mainHeroList = new MainHeroList(3);

        let tavern = new Tavern();

        tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
        tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Rogue), 1);
        tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Gunslinger), 1);
        tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.FireMage), 1);
        tavern.add(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Archer), 1);
        console.log(tavern);

        tavern.delete(0);
        // tavern.remove(1);
        // tavern.remove(1);
        // tavern.remove(1);
        // console.log(tavern);

        tavern.hire(0, heroFactory, mainHeroList);
        tavern.hire(0, heroFactory, mainHeroList);
        tavern.hire(0, heroFactory, mainHeroList);
        tavern.hire(0, heroFactory, mainHeroList);
        console.log(tavern);
        console.log(mainHeroList);
    }
}