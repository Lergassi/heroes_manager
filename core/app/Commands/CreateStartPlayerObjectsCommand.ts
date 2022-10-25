import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import HeroFactory from '../Factories/HeroFactory.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {unsigned} from '../types.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';

export default class CreateStartPlayerObjectsCommand extends Command {
    get name(): string {
        return CommandNameID.create_player_start_objects;
    }

    get description(): string {
        return 'Создает начальные объекты игрока: предметы, герои и тд. Окружение должно быть создано отдельно.';
    }

    async execute(input: Input) {
        this._createItemStorages();
        this._createItems();
        this._createHeroes();
    }

    private _createItemStorages() {
        // this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        // this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        this.container.get<MainItemStorageListComponent>(ContainerKey.MainItemStorageList).create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>(ContainerKey.ItemStorageFactory),
        );
        this.container.get<MainItemStorageListComponent>(ContainerKey.MainItemStorageList).create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>(ContainerKey.ItemStorageFactory),
        );
    }

    private _createItems() {
        let items = [
            {
                itemID: ItemID.Wood,
                count: 10,
            },
            {
                itemID: ItemID.IronOre,
                count: 10,
            },
            {
                itemID: ItemID.OneHandedSword_01,
                count: 1,
            },
            {
                itemID: ItemID.OneHandedSword_01,
                count: 1,
            },
            {
                itemID: ItemID.PlateHelmet_01,
                count: 1,
            },
            {
                itemID: ItemID.PlateBoots_01,
                count: 1,
            },
            {
                itemID: ItemID.Shield_01,
                count: 1,
            },
        ];

        for (let i = 0; i < items.length; i++) {
            //todo: Отдельный класс для подобной логики.
            let item = this.container.get<EntityManagerInterface>(ContainerKey.EntityManager).get<Item>(EntityID.Item, items[i].itemID);
            if (!item) {
                debug(DebugNamespaceID.Warring)(sprintf('Предмет ID(%s) начального набора предметов не найден и не будет добавлен в сумки.', items[i].itemID));
                continue;
            }

            this.container.get<ItemStorageManager>(ContainerKey.ItemStorageManager).addItemStack(
                this.container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).create(item, items[i].count),
            );
        }
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
                    [EquipSlotID.Head]: ItemID.PlateHelmet_02,
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate_01,
                    [EquipSlotID.Legs]: ItemID.PlatePants_01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots_01,
                    [EquipSlotID.RightHand]: ItemID.OneHandedSword_01,
                    [EquipSlotID.LeftHand]: ItemID.Shield_01,
                },
            },
            {
                heroClassID: HeroClassID.Paladin,
                level: 1,
                equip: {
                    [EquipSlotID.Head]: ItemID.PlateHelmet_02,
                    [EquipSlotID.Chest]: ItemID.PlateBreastplate_01,
                    [EquipSlotID.Legs]: ItemID.PlatePants_01,
                    [EquipSlotID.Foots]: ItemID.PlateBoots_01,
                    [EquipSlotID.RightHand]: ItemID.OneHandedSword_01,
                    [EquipSlotID.LeftHand]: ItemID.Shield_01,
                },
            },
            {
                heroClassID: HeroClassID.Rogue,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.LeatherBreastplate_01,
                    [EquipSlotID.Legs]: ItemID.LeatherPants_01,
                    [EquipSlotID.Foots]: ItemID.LeatherBoots_01,
                    [EquipSlotID.RightHand]: ItemID.Dagger_01,
                    [EquipSlotID.LeftHand]: ItemID.Dagger_01,
                },
            },
            {
                heroClassID: HeroClassID.Mage,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.ClothBreastplate_01,
                    [EquipSlotID.Legs]: ItemID.ClothPants_01,
                    [EquipSlotID.Foots]: ItemID.ClothBoots_01,
                    [EquipSlotID.RightHand]: ItemID.Staff_01,
                },
            },
            {
                heroClassID: HeroClassID.Gunslinger,
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: ItemID.LeatherBreastplate_01,
                    [EquipSlotID.Legs]: ItemID.LeatherPants_01,
                    [EquipSlotID.Foots]: ItemID.LeatherBoots_01,
                    [EquipSlotID.RightHand]: ItemID.Revolver_01,
                    [EquipSlotID.LeftHand]: ItemID.Revolver_01,
                },
            },
        ];

        for (let i = 0; i < heroPatterns.length; i++) {
            let hero = this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
                heroClass: heroPatterns[i].heroClassID,
                level: 1,
                heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
            });

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i].equip) {
                let item = this.container.get<EntityManagerInterface>(ContainerKey.EntityManager).get<Item>(EntityID.Item, heroPatterns[i].equip[equipSlotID]);
                if (!item) {
                    debug(DebugNamespaceID.Warring)(sprintf('Предмет ID(%s) начальной экипировки не найден. Слот останется пустым.', heroPatterns[i].equip[equipSlotID]));
                    continue;
                }

                hero
                    .get<EquipSlotInterface>(equipSlotID)
                    ?.createItemStack(
                        item,
                        1,
                        this.container.get<ItemStackFactory>(ContainerKey.ItemStackFactory),
                    );
            }
        }

        this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
            heroClass: HeroClassID.Warrior,
            level: 1,
            heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
        });
        this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
            heroClass: HeroClassID.Warrior,
            level: 1,
            heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
        });
    }
}