import {database} from '../../core/data/ts/database.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class DatabaseTSSandboxController extends AbstractSandboxController {
    run(): void {
        // this._getStarted();
        // this._devTestThis();
        this._devHeroClasses();
    }

    private _getStarted() {
        let enemyTypeID = EnemyTypeID.Boar;
        console.log(enemyTypeID + '.exp: ', database.enemies.rewards.exp(enemyTypeID));
        console.log(enemyTypeID + '.money: ', database.enemies.rewards.money(enemyTypeID));
        database.enemies.rewards.items(enemyTypeID, (itemID, count, chance) => {
            console.log(enemyTypeID + '.item: ', itemID, count, chance);
        });
    }

    private _devTestThis() {
        // console.log(database.test.foo());
        // database.test.f1();
        // database.test.f2();
        database.test.f3();

        // database.heroes.equip_sets.equipSet(HeroClassID.Warrior, (itemCategoryID, count) => {
        //     console.log(itemCategoryID);
        // })
    }

    private _devHeroClasses() {
        console.log(database.hero_classes.data.heroRole(HeroClassID.Warrior));
        console.log(database.hero_classes.data.heroRole(HeroClassID.FireMage));
        database.hero_classes.data.armorMaterials(HeroClassID.Warrior, (ID) => {
            console.log(ID);
        });
        database.hero_classes.data.armorMaterials(HeroClassID.FireMage, (ID) => {
            console.log(ID);
        });
    }
}