import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Command from '../../../source/GameConsole/Command.js';
import GameConsole from '../../../source/GameConsole/GameConsole.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import {ComponentID} from '../../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {HeroClassID} from '../../../types/enums/HeroClassID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import {LocationTypeID} from '../../../types/enums/LocationTypeID.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import Production from '../../Components/Production';
import Location from '../../Components/Location.js';
import MainHeroList from '../../Components/MainHeroList.js';
import MainLocationList from '../../Components/MainLocationList.js';
import Tavern_v2 from '../../Components/Tavern_v2.js';
import EnemyFactory from '../../Factories/EnemyFactory.js';
import LocationFactory from '../../Factories/LocationFactory.js';
import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import _ from "lodash";
import {EnemyTypeID} from "../../../types/enums/EnemyTypeID";
import GameObject from "../../../source/GameObject";
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface';
import {Farming} from '../../Components/Farming';

export default class CreateDefaultStartPlayerObjectsCommand extends Command {
    get name(): string {
        return CommandID.create_default_start_player_objects;
    }

    async execute(input: Input) {
        // await this._createItemStorages();
        await this._configTavern();
        await this._configFarming();
        await this._configProduction();
        await this._configMoney();
        await this._createItems();
        await this._createHeroes();
        await this._createLocations();
    }

    private async _configTavern() {
        // this.container.get<TavernController>(ServiceID.TavernController).update();
        // let tavern = this.container.get<Tavern>(ServiceID.Tavern);
        // let tavernController = this.container.get<TavernController>(ServiceID.TavernController);
        //
        // // tavern.add(HeroClassID.Barbarian, 1);
        // tavern.add(HeroClassID.Warrior, 1);

        let tavern = this.container.get<Tavern_v2>(ServiceID.Tavern_v2);

        tavern.add(HeroClassID.Warrior, 1, 350);

        // tavern.add(HeroClassID.Rogue, 1, 80);
        tavern.add(HeroClassID.Gunslinger, 1, 200);
        tavern.add(HeroClassID.FireMage, 1, 450);

        tavern.add(HeroClassID.Support1, 1, 1000);
    }

    private async _createItemStorages() {
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_storage, [String(DEFAULT_ITEM_STORAGE_SIZE)]);
    }

    private async _createItems() {
        // this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(ItemID.EndurancePotion01, 10);
        this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(ItemID.Wood, 100);
        this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(ItemID.Herb01Seed, 100);
        this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(ItemID.Herb02Seed, 100);
    }

    private _createHeroes() {
        let heroPatterns: {
            heroClassID: HeroClassID,
            level: number,
            equip: Partial<{[ID in EquipSlotID]: ItemID}>,
        }[] = [
            // {
            //     heroClassID: HeroClassID.Warrior,
            //     level: 1,
            //     equip: {
            //         [EquipSlotID.Head]: ItemID.PlateHelmet02,
            //         [EquipSlotID.Chest]: ItemID.PlateBreastplate01,
            //         [EquipSlotID.Legs]: ItemID.PlatePants01,
            //         [EquipSlotID.Foots]: ItemID.PlateBoots01,
            //         [EquipSlotID.RightHand]: ItemID.OneHandedSword01,
            //         [EquipSlotID.LeftHand]: ItemID.Shield01,
            //     },
            // },
            {
                heroClassID: HeroClassID.Barbarian,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate01,
                    [EquipSlotID.Legs]: ItemID.PlatePants01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots01,
                    [EquipSlotID.RightHand]: ItemID.TwoHandedSword01,
                },
            },
            {
                heroClassID: HeroClassID.Rogue,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.LeatherBreastplate01,
                    [EquipSlotID.Legs]: ItemID.LeatherPants01,
                    [EquipSlotID.Foots]: ItemID.LeatherBoots01,
                    [EquipSlotID.RightHand]: ItemID.Dagger01,
                    [EquipSlotID.LeftHand]: ItemID.Dagger01,
                },
            },
            // {
            //     heroClassID: HeroClassID.FireMage,
            //     level: 1,
            //     equip: {
            //         [EquipSlotID.Chest]: ItemID.ClothBreastplate01,
            //         [EquipSlotID.Legs]: ItemID.ClothPants01,
            //         [EquipSlotID.Foots]: ItemID.ClothBoots01,
            //         [EquipSlotID.RightHand]: ItemID.Staff01,
            //     },
            // },
            // {
            //     heroClassID: HeroClassID.Gunslinger,
            //     level: 1,
            //     equip: {
            //         [EquipSlotID.Chest]: ItemID.LeatherBreastplate01,
            //         [EquipSlotID.Legs]: ItemID.LeatherPants01,
            //         [EquipSlotID.Foots]: ItemID.LeatherBoots01,
            //         [EquipSlotID.RightHand]: ItemID.Revolver01,
            //         [EquipSlotID.LeftHand]: ItemID.Revolver01,
            //     },
            // },
        ];

        for (let i = 0; i < heroPatterns.length; i++) {
            let hero = this.container.get<MainHeroList>(ServiceID.MainHeroList).createHero(
                heroPatterns[i].heroClassID,
                1,
            );

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i].equip) {
                let itemID = heroPatterns[i].equip[equipSlotID] as ItemID;
                if (!itemID) {
                    debug(DebugNamespaceID.Replace)(sprintf('Предмет ID(%s) начальной экипировки не найден. Слот останется пустым.', heroPatterns[i].equip[equipSlotID]));
                    continue;
                }

                hero
                    .get<EquipSlotInterface>(equipSlotID)
                    ?.equip(itemID);
            }
        }
    }

    private async _createLocations() {
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
        // this._manualCreateLocations();
        // this._createDevLocations();

        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let level = 1;

        let locations: GameObject[] = [];

        locations.push(locationFactory.create(LocationTypeID.Barrens, level));

        // locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, level, 1000));
        locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Goblin, level, 20));
        locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, level, 10));
        // locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Skeleton, level, 20));
        // locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Skeleton, level, 5));
        // locations[locations.length - 1].get<Location>(ComponentID.Location).configResource(ItemID.IronOre, 1000);
        // locations[locations.length - 1].get<Location>(ComponentID.Location).configResource(ItemID.Herb01, 1000);

        locations.push(locationFactory.create(LocationTypeID.Forrest, level));

        locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Wolf, 3, 20));
        locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 5, 1));
        // locations[locations.length - 1].get<Location>(ComponentID.Location).addResource(ItemID.Herb01, 1000);

        locations.push(locationFactory.create(LocationTypeID.Forrest, level));

        locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bandit, 5, 30));
        locations[locations.length - 1].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.ForrestDog, 3, 10));
        // locations[locations.length - 1].get<Location>(ComponentID.Location).addResource(ItemID.Herb02, 1000);
        console.log(locations);

        for (let i = 0; i < locations.length; i++) {
            this.container.get<MainLocationList>(ServiceID.MainLocationList).add(locations[i]);
        }
    }

    private async _manualCreateLocations() {
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['1']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['1']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['1']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['2']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['2']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['2']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['3']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['3']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['3']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['4']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['4']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['4']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['5']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['5']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['5']);
    }

    private _createDevLocations(): void {

    }

    private async _configMoney() {
        /*
            При увеличении начального золота нужно кооректировать стоимость всего остального.
        */
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.add_money, ['100']);
    }

    // private async _configProduction() {
    //     // (new ProductionConfigurator()).configure(this.container.get<Production>(ServiceID.Production));
    //
    //     let production = this.container.get<Production>(ServiceID.Production);
    //
    //     production.addItem(ItemID.IronIngot);
    //     production.addItem(ItemID.Leather01);
    //     production.addItem(ItemID.CottonThread);
    //     production.addItem(ItemID.CottonCloth);
    //
    //     production.addItem(ItemID.HealthPotion01);
    //     production.addItem(ItemID.EndurancePotion01);
    //
    //     production.addItem(ItemID.Uncommon_Plate_Gloves_003_01);
    //     production.addItem(ItemID.Uncommon_Plate_Belt_003_01);
    //     production.addItem(ItemID.Uncommon_Plate_Breastplate_009_01);
    //     // production.addItem(ItemID.Uncommon_Plate_Boots_009_01);
    //     // production.addItem(ItemID.Uncommon_Plate_Helmet_012_01);
    //     // production.addItem(ItemID.Uncommon_Plate_Bracer_012_01);
    //     // production.addItem(ItemID.Uncommon_Plate_ShoulderPads_019_01);
    //     // production.addItem(ItemID.Uncommon_Plate_Pants_022_01);
    //     //
    //     production.addItem(ItemID.Uncommon_Leather_Gloves_003_01);
    //     production.addItem(ItemID.Uncommon_Leather_Belt_003_01);
    //     production.addItem(ItemID.Uncommon_Leather_Breastplate_009_01);
    //     // production.addItem(ItemID.Uncommon_Leather_Boots_009_01);
    //     // production.addItem(ItemID.Uncommon_Leather_Helmet_012_01);
    //     // production.addItem(ItemID.Uncommon_Leather_Bracer_012_01);
    //     // production.addItem(ItemID.Uncommon_Leather_ShoulderPads_019_01);
    //     // production.addItem(ItemID.Uncommon_Leather_Pants_022_01);
    //     //
    //     // production.addItem(ItemID.Uncommon_Cloth_Gloves_003_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_Belt_003_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_Breastplate_009_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_Boots_009_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_Helmet_012_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_Bracer_012_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_ShoulderPads_019_01);
    //     // production.addItem(ItemID.Uncommon_Cloth_Pants_022_01);
    //
    //     production.addItem(ItemID.Uncommon_OneHandedSword_006_01);
    //     production.addItem(ItemID.Uncommon_TwoHandedSword_006_01);
    //     // production.addItem(ItemID.Uncommon_Staff_006_01);
    //     production.addItem(ItemID.Uncommon_Dagger_006_01);
    //     // production.addItem(ItemID.Uncommon_Bow_006_01);
    //     production.addItem(ItemID.Uncommon_Revolver_006_01);
    //     production.addItem(ItemID.Uncommon_Shield_006_01);
    //
    //     production.addItem(ItemID.Uncommon_Ring_009_01);
    //     // production.addItem(ItemID.Uncommon_Ring_009_02);
    //     production.addItem(ItemID.Uncommon_Ring_009_03);
    //     production.addItem(ItemID.Uncommon_Ring_009_04);
    //     // production.addItem(ItemID.Uncommon_Ring_009_05);
    //     // production.addItem(ItemID.Uncommon_Ring_009_02);
    //     // production.addItem(ItemID.Uncommon_Ring_009_03);
    //     // production.addItem(ItemID.Uncommon_Amulet_019_01);
    //     // production.addItem(ItemID.Uncommon_Amulet_019_02);
    //     // production.addItem(ItemID.Uncommon_Amulet_019_03);
    //     // production.addItem(ItemID.Uncommon_Ring_022_01);
    //     // production.addItem(ItemID.Uncommon_Ring_022_02);
    //     // production.addItem(ItemID.Uncommon_Ring_022_03);
    // }

    private async _configProduction() {
        let blacksmith = this.container.get<Production>(ServiceID.Blacksmith);
        let leatherWorking = this.container.get<Production>(ServiceID.LeatherWorking);
        let tailoring = this.container.get<Production>(ServiceID.Tailoring);
        let alchemy = this.container.get<Production>(ServiceID.Alchemy);
        let jewelry = this.container.get<Production>(ServiceID.Jewelry);

        blacksmith.addItem(ItemID.IronIngot);

        blacksmith.addItem(ItemID.Uncommon_Plate_Gloves_003_01);
        blacksmith.addItem(ItemID.Uncommon_Plate_Belt_003_01);
        blacksmith.addItem(ItemID.Uncommon_Plate_Breastplate_009_01);
        // blacksmith.addItem(ItemID.Uncommon_Plate_Boots_009_01);
        // blacksmith.addItem(ItemID.Uncommon_Plate_Helmet_012_01);
        // blacksmith.addItem(ItemID.Uncommon_Plate_Bracer_012_01);
        // blacksmith.addItem(ItemID.Uncommon_Plate_ShoulderPads_019_01);
        // blacksmith.addItem(ItemID.Uncommon_Plate_Pants_022_01);

        blacksmith.addItem(ItemID.Uncommon_OneHandedSword_006_01);
        blacksmith.addItem(ItemID.Uncommon_TwoHandedSword_006_01);
        // blacksmith.addItem(ItemID.Uncommon_Staff_006_01);
        blacksmith.addItem(ItemID.Uncommon_Dagger_006_01);
        // blacksmith.addItem(ItemID.Uncommon_Bow_006_01);
        blacksmith.addItem(ItemID.Uncommon_Revolver_006_01);
        blacksmith.addItem(ItemID.Uncommon_Shield_006_01);

        leatherWorking.addItem(ItemID.Leather01);

        leatherWorking.addItem(ItemID.Uncommon_Leather_Gloves_003_01);
        leatherWorking.addItem(ItemID.Uncommon_Leather_Belt_003_01);
        leatherWorking.addItem(ItemID.Uncommon_Leather_Breastplate_009_01);
        // blacksmith.addItem(ItemID.Uncommon_Leather_Boots_009_01);
        // blacksmith.addItem(ItemID.Uncommon_Leather_Helmet_012_01);
        // blacksmith.addItem(ItemID.Uncommon_Leather_Bracer_012_01);
        // blacksmith.addItem(ItemID.Uncommon_Leather_ShoulderPads_019_01);
        // blacksmith.addItem(ItemID.Uncommon_Leather_Pants_022_01);

        tailoring.addItem(ItemID.CottonThread);
        tailoring.addItem(ItemID.CottonCloth);

        tailoring.addItem(ItemID.Uncommon_Cloth_Gloves_003_01);
        tailoring.addItem(ItemID.Uncommon_Cloth_Belt_003_01);
        tailoring.addItem(ItemID.Uncommon_Cloth_Breastplate_009_01);
        // tailoring.addItem(ItemID.Uncommon_Cloth_Boots_009_01);
        // tailoring.addItem(ItemID.Uncommon_Cloth_Helmet_012_01);
        // tailoring.addItem(ItemID.Uncommon_Cloth_Bracer_012_01);
        // tailoring.addItem(ItemID.Uncommon_Cloth_ShoulderPads_019_01);
        // tailoring.addItem(ItemID.Uncommon_Cloth_Pants_022_01);

        alchemy.addItem(ItemID.HealthPotion01);
        alchemy.addItem(ItemID.EndurancePotion01);

        jewelry.addItem(ItemID.Uncommon_Ring_009_01);
        // jewelry.addItem(ItemID.Uncommon_Ring_009_02);
        jewelry.addItem(ItemID.Uncommon_Ring_009_03);
        jewelry.addItem(ItemID.Uncommon_Ring_009_04);
        // jewelry.addItem(ItemID.Uncommon_Ring_009_05);
        // jewelry.addItem(ItemID.Uncommon_Ring_009_02);
        // jewelry.addItem(ItemID.Uncommon_Ring_009_03);
        // jewelry.addItem(ItemID.Uncommon_Amulet_019_01);
        // jewelry.addItem(ItemID.Uncommon_Amulet_019_02);
        // jewelry.addItem(ItemID.Uncommon_Amulet_019_03);
        // jewelry.addItem(ItemID.Uncommon_Ring_022_01);
        // jewelry.addItem(ItemID.Uncommon_Ring_022_02);
        // jewelry.addItem(ItemID.Uncommon_Ring_022_03);
    }

    private async _configFarming() {
        // let farming = this.container.get<Farming>(ServiceID.Farming);
        //
        // farming.buildGardenBed()
    }
}