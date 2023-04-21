import _ from 'lodash';
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
import {unsigned} from '../../../types/main.js';
import Location from '../../Components/Location.js';
import MainHeroList from '../../Components/MainHeroList.js';
import MainLocationList from '../../Components/MainLocationList.js';
import LocationFactory from '../../Factories/LocationFactory.js';
import EquipSlotInterface from '../../Interfaces/EquipSlotInterface.js';
import Tavern_v2 from '../../Components/Tavern_v2.js';
import {database} from '../../../data/ts/database.js';
import LocationConfiguratorByDB from '../../Services/LocationConfiguratorByDB.js';
import Production from '../../Components/Production.js';
import DebugApp from '../../Services/DebugApp.js';

export default class CreateBasicStartPlayerObjectsCommand extends Command {
    get name(): string {
        return CommandID.create_basic_start_player_objects;
    }

    async execute(input: Input) {
        await this._createItemStorages();   //1 сумка уже есть у каждого игрока.
        await this._configTavern();
        await this._createLocations();
        await this._configProduction();
        await this._createItems();
        await this._configMoney();
        await this._createHeroes();
    }

    private async _createItemStorages() {
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_storage, [String(DEFAULT_ITEM_STORAGE_SIZE)]);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_storage, [String(DEFAULT_ITEM_STORAGE_SIZE)]);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_storage, [String(DEFAULT_ITEM_STORAGE_SIZE)]);
    }

    private async _createItems() {
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_kit, ['start_resources']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_kit, ['start_materials']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_kit, ['start_plate_armor']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_kit, ['start_leather_armor']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_kit, ['start_cloth_armor']);
        // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_kit, ['start_jewelry']);

        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.HealthPotion01, '10']);
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.EndurancePotion01, '10']);
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '10']);
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.IronIngot, '10']);
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.OneHandedSword01, '1']);
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.Shield01, '1']);
    }

    private _createHeroes() {
        //todo: config
        //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
        //todo: Сделать проще: в одну строку.
        let heroPatterns: {
            heroClassID: HeroClassID,
            level: unsigned,
            equip: Partial<{ [ID in EquipSlotID]: ItemID }>,
        }[] = [
            {
                heroClassID: HeroClassID.Warrior,
                level: 1,
                equip: {
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
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate01,
                    [EquipSlotID.Legs]: ItemID.PlatePants01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots01,
                    [EquipSlotID.RightHand]: ItemID.TwoHandedSword01,
                },
            },
            {
                heroClassID: HeroClassID.Paladin,
                level: 1,
                equip: {
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
            }, {
                heroClassID: HeroClassID.Gladiator,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate01,
                    [EquipSlotID.Legs]: ItemID.PlatePants01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots01,
                    [EquipSlotID.RightHand]: ItemID.OneHandedSword01,
                    [EquipSlotID.LeftHand]: ItemID.OneHandedSword01,
                },
            },
            {
                heroClassID: HeroClassID.FireMage,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.ClothBreastplate01,
                    [EquipSlotID.Legs]: ItemID.ClothPants01,
                    [EquipSlotID.Foots]: ItemID.ClothBoots01,
                    [EquipSlotID.RightHand]: ItemID.Staff01,
                },
            },
            {
                heroClassID: HeroClassID.Gunslinger,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.LeatherBreastplate01,
                    [EquipSlotID.Legs]: ItemID.LeatherPants01,
                    [EquipSlotID.Foots]: ItemID.LeatherBoots01,
                    [EquipSlotID.RightHand]: ItemID.Revolver01,
                    [EquipSlotID.LeftHand]: ItemID.Revolver01,
                },
            },
            {
                heroClassID: HeroClassID.Archer,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.LeatherBreastplate01,
                    [EquipSlotID.Legs]: ItemID.LeatherPants01,
                    [EquipSlotID.Foots]: ItemID.LeatherBoots01,
                    [EquipSlotID.RightHand]: ItemID.Bow01,
                },
            },
            {
                heroClassID: HeroClassID.Support1,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.ClothBreastplate01,
                    [EquipSlotID.Legs]: ItemID.ClothPants01,
                    [EquipSlotID.Foots]: ItemID.ClothBoots01,
                    [EquipSlotID.RightHand]: ItemID.Staff01,
                },
            },
            {
                heroClassID: HeroClassID.Support2,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.ClothBreastplate01,
                    [EquipSlotID.Legs]: ItemID.ClothPants01,
                    [EquipSlotID.Foots]: ItemID.ClothBoots01,
                    [EquipSlotID.RightHand]: ItemID.Staff01,
                },
            },
            {
                heroClassID: HeroClassID.Support3,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.ClothBreastplate01,
                    [EquipSlotID.Legs]: ItemID.ClothPants01,
                    [EquipSlotID.Foots]: ItemID.ClothBoots01,
                    [EquipSlotID.RightHand]: ItemID.Staff01,
                },
            },
        ];

        // let heroesForPattern = 2;
        // let patterns = [];
        // for (let i = 0; i < heroPatterns.length; i++) {
        //     for (let j = 0; j < heroesForPattern; j++) {
        //         patterns.push(heroPatterns[i]);
        //     }
        // }
        // patterns = _.shuffle(patterns);
        // console.log(patterns);

        for (let i = 0; i < heroPatterns.length; i++) {
            // for (let i = 0; i < patterns.length; i++) {
            let hero = this.container.get<MainHeroList>(ServiceID.MainHeroList).createHero(
                heroPatterns[i].heroClassID,
                1,
            );

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i].equip) {
                let itemID = heroPatterns[i].equip[equipSlotID] as ItemID;
                if (!itemID) {
                    DebugApp.debug(DebugNamespaceID.Warning)(sprintf('Предмет ID(%s) начальной экипировки не найден. Слот останется пустым.', heroPatterns[i].equip[equipSlotID]));
                    continue;
                }

                hero
                    .get<EquipSlotInterface>(equipSlotID)
                    ?.equip(itemID);
            }
        }
    }

    // private async _createLocations() {
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location);
    //
    //     this._manualCreateLocations();
    // }
    //
    // private async _manualCreateLocations() {
    //     await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['1']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['1']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['1']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['2']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['2']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['2']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['3']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['3']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['3']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['4']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['4']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['4']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['5']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['5']);
    //     // await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_location, ['5']);
    // }

    private _createFullRangeLocations() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);

        // let maxLocationLevel = 100;
        let maxLocationLevel = 35;
        let mainLocationList = this.container.get<MainLocationList>(ServiceID.MainLocationList);

        let locationsForLevel = [5, 10];    //Числа случайные. Логика будет дальше.
        let startLocationLevel = 1;
        for (let level = startLocationLevel; level <= maxLocationLevel; level++) {
            _.map(_.range(0, _.random(locationsForLevel[0], locationsForLevel[1]) + 1), () => {
                mainLocationList.add(locationFactory.create(LocationTypeID.Forrest, level));
            });
        }
    }

    private async _configMoney() {
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.add_money, ['10000']);
    }

    private async _configTavern() {
        let tavern = this.container.get<Tavern_v2>(ServiceID.Tavern_v2);

        let data = database.hero_classes.cost.findAll();
        let heroClasses = [];
        let heroesForHeroClass = 1;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < heroesForHeroClass; j++) {
                heroClasses.push(data[i]);
            }
        }
        heroClasses = _.shuffle(heroClasses);

        for (let i = 0; i < heroClasses.length; i++) {
            tavern.add(<HeroClassID>heroClasses[i].heroClassId, 1, heroClasses[i].cost);
        }
    }

    private async _createLocations() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);

        let locationTypes = {
            [LocationTypeID.Barrens]: 8,
            [LocationTypeID.Forrest]: 8,
            [LocationTypeID.Mountains]: 8,
        };
        let level = 1;
        for (const locationTypesID in locationTypes) {
            for (let i = 0; i < locationTypes[locationTypesID]; i++) {
                let location = locationFactory.create(<LocationTypeID>locationTypesID, level);

                this.container.get<LocationConfiguratorByDB>(ServiceID.LocationConfigurator).configure(location.get<Location>(ComponentID.Location));

                this.container.get<MainLocationList>(ServiceID.MainLocationList).add(location);
            }
        }
    }

    private async _configProduction() {
        let items = database.items.data.findAll();
        for (let i = 0; i < items.length; i++) {
            if (!items[i].ProductionId) continue;

            //todo: Сделать доступ к производству из контейнера более удобным, без 'player.' + ProductionId.
            this.container.get<Production>('player.' + items[i].ProductionId)?.addItem(items[i].ID);
        }
    }
}