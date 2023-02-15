import FightGroupController from '../../core/app/Components/FightGroupController.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import LocationFactory from '../../core/app/Factories/LocationFactory.js';
import {separator} from '../../core/app/indev.js';
import {debug_header, separate} from '../../core/debug_functions.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';
import _ from 'lodash';

export default class FightSandboxController extends AbstractSandboxController {
    run(): void {
        this._devV2GetStarted();
    }

    private _devV2GetStarted() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);
        let heroFactory = this.container.get<HeroFactory>(ServiceID.HeroFactory);

        // let locationGO = locationFactory.create(LocationTypeID.Forrest, 1);
        // let location = locationGO.get<Location>(ComponentID.Location);
        // console.log(location);

        let heroes = [
            heroFactory.create(HeroClassID.Warrior, 1),
            heroFactory.create(HeroClassID.Barbarian, 1),
            heroFactory.create(HeroClassID.Barbarian, 1),
            heroFactory.create(HeroClassID.Barbarian, 1),
            heroFactory.create(HeroClassID.Barbarian, 1),
            heroFactory.create(HeroClassID.Barbarian, 1),
            heroFactory.create(HeroClassID.Rogue, 1),
            heroFactory.create(HeroClassID.FireMage, 1),
            heroFactory.create(HeroClassID.Support1, 1),
        ];

        let enemies = [
            enemyFactory.create(EnemyTypeID.Boar, 1),
            enemyFactory.create(EnemyTypeID.Boar, 1),
            enemyFactory.create(EnemyTypeID.Boar, 1),
            enemyFactory.create(EnemyTypeID.Boar, 1),
            enemyFactory.create(EnemyTypeID.Boar, 1),
        ];

        let heroFightController = new FightGroupController();
        let enemyFightController = new FightGroupController({
            deleteDeadCharacter: true,
        });

        // _.map(heroes, (hero) => {
        //     heroFightController.addCharacter(hero);
        // });

        heroFightController.addCharacter(heroes[0]);
        // heroFightController.addCharacter(heroes[1]);
        // heroFightController.addCharacter(heroes[2]);

        enemyFightController.addCharacter(enemies[0]);
        // heroFightController.addCharacter(enemies[1]);
        // heroFightController.addCharacter(enemies[2]);

        // enemyFightController.damageFirstCharacter(42);
        // enemyFightController.damageFirstCharacter(42);
        // enemyFightController.damageFirstCharacter(42);
        // enemyFightController.damageFirstCharacter(42);
        // enemyFightController.damageFirstCharacter(42);

        // heroFightController.damageFirstCharacter(42);
        // heroFightController.damageFirstCharacter(42);
        // heroFightController.damageFirstCharacter(42);
        // heroFightController.damageFirstCharacter(42);

        // enemyFightController.damageFirstCharacter(42);
        // heroFightController.damageFirstCharacter(42);
        // separate();

        let hits = 10;
        _.map(_.range(0, hits), () => {
            // enemyFightController.damageFirstCharacter(42);
            // heroFightController.damageFirstCharacter(42);
            heroFightController.attack(enemyFightController);
            enemyFightController.attack(heroFightController);
            separate();
            separate();
        });

        console.log('heroFightController', heroFightController);
        console.log('enemyFightController', enemyFightController);
    }
}