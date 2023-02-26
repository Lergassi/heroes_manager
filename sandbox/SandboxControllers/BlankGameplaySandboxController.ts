import MainHeroList from '../../core/app/Components/MainHeroList.js';
import Tavern from '../../core/app/Components/Tavern.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class BlankGameplaySandboxController extends AbstractSandboxController {
    run(): void {
        this._tavern();
    }

    private _tavern() {
        let mainHeroList = this.container.get<MainHeroList>(ServiceID.MainHeroList);
        let tavern = new Tavern();

        // console.log(tavern.add(HeroClassID.Warrior, 1));
        // console.log(tavern.add(HeroClassID.Warrior, 2));
        console.log(tavern.add(HeroClassID.Warrior, 3));

        // console.log(tavern.remove(HeroClassID.Warrior, 1));
        // console.log(tavern.remove(HeroClassID.Warrior, 2));
        // console.log(tavern.remove(HeroClassID.Warrior, 2));
        // console.log(tavern.remove(HeroClassID.Warrior, 1));
        // console.log(tavern.remove(HeroClassID.Warrior, 10));
        // console.log(tavern);
        //
        tavern.hire(HeroClassID.FireMage, mainHeroList);
        tavern.hire(HeroClassID.Warrior, mainHeroList);
        tavern.hire(HeroClassID.Warrior, mainHeroList);
        tavern.hire(HeroClassID.Warrior, mainHeroList);
        tavern.hire(HeroClassID.Warrior, mainHeroList);
        tavern.hire(HeroClassID.Warrior, mainHeroList);
        console.log(mainHeroList);
    }
}