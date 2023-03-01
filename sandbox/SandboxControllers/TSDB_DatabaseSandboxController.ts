import {database} from '../../core/data/ts/database.js';
import {items} from '../../core/data/ts/items.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {LocationTypeID} from '../../core/types/enums/LocationTypeID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class TSDB_DatabaseSandboxController extends AbstractSandboxController {
    run(): void {
        // this._getStarted();
        // this._devTestThis();
        // this._devHeroClasses();
        // this._devLocations();
        this._devItems();
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

    private _devLocations() {
        database.locations.resources.find(LocationTypeID.Forrest, (itemID, count) => {
            console.log(LocationTypeID.Forrest, itemID, count);
        });
        database.locations.enemies.find(LocationTypeID.Forrest, (enemyTypeID, count) => {
            console.log(LocationTypeID.Forrest, enemyTypeID, count);
        });
    }

    private _devItems() {
        let itemID = ItemID.OneHandedSword01;
        console.log(items);
        console.log(items.hasItem(itemID));
        console.log(items.itemLevel(itemID));
        console.log(items.armorMaterial(itemID));
        console.log(items.itemCategory(itemID));
        console.log(items.qualityID(itemID));
    }
}