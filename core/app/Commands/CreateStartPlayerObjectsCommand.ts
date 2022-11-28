import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import HeroFactory from '../Factories/HeroFactory.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {unsigned} from '../../types/main.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import {CommandID} from '../../types/enums/CommandID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import GameConsole from '../../source/GameConsole/GameConsole.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';

export default class CreateStartPlayerObjectsCommand extends Command {
    get name(): string {
        return CommandID.create_start_player_objects;
    }

    get description(): string {
        return 'Создает начальные объекты игрока: предметы, герои и тд. Окружение должно быть создано отдельно.';
    }

    async execute(input: Input) {
        await this._createItemStorages();
        await this._createItems();
        await this._createHeroes();
        await this._createLocations();
    }

    private async _createItemStorages() {
        // this.container.get<MainItemStorageListComponent>(ContainerID.MainItemStorageList).create(
        //     DEFAULT_ITEM_STORAGE_SIZE,
        //     this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory),
        // );
        // this.container.get<MainItemStorageListComponent>(ContainerID.MainItemStorageList).create(
        //     DEFAULT_ITEM_STORAGE_SIZE,
        //     this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory),
        // );
        await this.container.get<GameConsole>(ContainerID.GameConsole).getCommand(CommandID.create_item_storage).run([DEFAULT_ITEM_STORAGE_SIZE.toString()]);
        await this.container.get<GameConsole>(ContainerID.GameConsole).getCommand(CommandID.create_item_storage).run([DEFAULT_ITEM_STORAGE_SIZE.toString()]);
    }

    private async _createItems() {
        await this.container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item_kit, ['start_resources']);
        await this.container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item_kit, ['start_materials']);
    }

    private _createHeroes() {
        //todo: config
        //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
        //todo: Сделать проще: в одну строку.
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
                heroClassID: HeroClassID.Paladin,
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
        ];

        for (let i = 0; i < heroPatterns.length; i++) {
            let hero = this.container.get<MainHeroListComponent>(ContainerID.MainHeroList).createHero(
                heroPatterns[i].heroClassID,
                1,
                this.container.get<HeroFactory>(ContainerID.HeroFactory),
            );

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i].equip) {
                let item = this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Item>(EntityID.Item, heroPatterns[i].equip[equipSlotID]);
                if (!item) {
                    debug(DebugNamespaceID.Warning)(sprintf('Предмет ID(%s) начальной экипировки не найден. Слот останется пустым.', heroPatterns[i].equip[equipSlotID]));
                    continue;
                }

                hero
                    .get<EquipSlotInterface>(equipSlotID)
                    ?.createItemStack(
                        item,
                        1,
                        this.container.get<ItemStackFactory>(ContainerID.ItemStackFactory),
                    );
            }
        }

        this.container.get<MainHeroListComponent>(ContainerID.MainHeroList).createHero(
            HeroClassID.Warrior,
            1,
            this.container.get<HeroFactory>(ContainerID.HeroFactory),
        );
        this.container.get<MainHeroListComponent>(ContainerID.MainHeroList).createHero(
            HeroClassID.Warrior,
            1,
            this.container.get<HeroFactory>(ContainerID.HeroFactory),
        );
    }

    private async _createLocations() {
        await this.container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_location, ['1']);
    }
}