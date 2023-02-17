import _ from 'lodash';
import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {ComponentID} from '../../../types/enums/ComponentID.js';
import {EnemyTypeID} from '../../../types/enums/EnemyTypeID.js';
import {LocationTypeID} from '../../../types/enums/LocationTypeID.js';
import Location from '../../Components/Location.js';
import MainLocationList from '../../Components/MainLocationList.js';
import Item from '../../Entities/Item.js';
import EnemyFactory from '../../Factories/EnemyFactory.js';
import LocationFactory from '../../Factories/LocationFactory.js';
import ItemStorageManager from '../../Services/ItemStorageManager.js';
import HeroFactory from '../../Factories/HeroFactory.js';
import ItemStorageFactoryInterface from '../../Factories/ItemStorageFactoryInterface.js';
import MainHeroList from '../../Components/MainHeroList.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../../consts.js';
import MainItemStorageListComponent from '../../Components/MainItemStorageListComponent.js';
import {unsigned} from '../../../types/main.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import {HeroClassID} from '../../../types/enums/HeroClassID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import GameConsole from '../../../source/GameConsole/GameConsole.js';
import ItemStorageFactory from '../../Factories/ItemStorageFactory.js';

export default class CreateDefaultStartPlayerObjectsCommand extends Command {
    get name(): string {
        return CommandID.create_default_start_player_objects;
    }

    async execute(input: Input) {
        // await this._createItemStorages();
        await this._createItems();
        await this._addMoney();
        await this._createHeroes();
        await this._createLocations();
    }

    private async _createItemStorages() {
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_storage, [String(DEFAULT_ITEM_STORAGE_SIZE)]);
    }

    private async _createItems() {

    }

    private _createHeroes() {
        let heroPatterns: {
            heroClassID: HeroClassID,
            level: unsigned,
            equip: Partial<{[ID in EquipSlotID]: ItemID}>,
        }[] = [
            {
                heroClassID: HeroClassID.Warrior,
                level: 1,
                equip: {
                    [EquipSlotID.Head]: ItemID.PlateHelmet02,
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate01,
                    [EquipSlotID.Legs]: ItemID.PlatePants01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots01,
                    [EquipSlotID.RightHand]: ItemID.OneHandedSword01,
                    [EquipSlotID.LeftHand]: ItemID.Shield01,
                },
            },
            {
                heroClassID: HeroClassID.Barbarian,
                level: 1,
                equip: {
                    [EquipSlotID.Head]: ItemID.PlateHelmet02,
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate01,
                    [EquipSlotID.Legs]: ItemID.PlatePants01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots01,
                    [EquipSlotID.RightHand]: ItemID.OneHandedSword01,
                    [EquipSlotID.LeftHand]: ItemID.Shield01,
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
                this.container.get<HeroFactory>(ServiceID.HeroFactory),
            );

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i].equip) {
                let item = this.container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(EntityID.Item, heroPatterns[i].equip[equipSlotID]);
                if (!item) {
                    debug(DebugNamespaceID.Replace)(sprintf('Предмет ID(%s) начальной экипировки не найден. Слот останется пустым.', heroPatterns[i].equip[equipSlotID]));
                    continue;
                }

                hero
                    .get<EquipSlotInterface>(equipSlotID)
                    ?.equip(item);
            }
        }
    }

    private async _createLocations() {
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
        // this._manualCreateLocations();
        this._createDevLocations();
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
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let locationGO = locationFactory.create(LocationTypeID.Forrest, 1, {
            configureStrategy: 'default',
        });
        let location = locationGO.get<Location>(ComponentID.Location);

        // location.addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, 1));
        // location.addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, 1));
        // location.addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, 1));
        // location.addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, 1));
        // location.addEnemy(enemyFactory.createSquad(EnemyTypeID.Boar, 1));

        this.container.get<MainLocationList>(ServiceID.MainLocationList).add(locationGO);
    }

    private async _addMoney() {
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.add_money, ['1000']);
    }
}