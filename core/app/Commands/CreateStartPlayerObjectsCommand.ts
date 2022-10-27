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
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import GameConsole from '../../source/GameConsole/GameConsole.js';

export default class CreateStartPlayerObjectsCommand extends Command {
    get name(): string {
        return CommandNameID.create_start_player_objects;
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
        this.container.get<MainItemStorageListComponent>(ContainerID.MainItemStorageList).create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>(ContainerID.ItemStorageFactory),
        );
        this.container.get<MainItemStorageListComponent>(ContainerID.MainItemStorageList).create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>(ContainerID.ItemStorageFactory),
        );
    }

    private async _createItems() {
        await this.container.get<GameConsole>(ContainerID.GameConsole).run(CommandNameID.create_item_kit, ['start_resources']);
        await this.container.get<GameConsole>(ContainerID.GameConsole).run(CommandNameID.create_item_kit, ['start_materials']);
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
            let hero = this.container.get<MainHeroListComponent>(ContainerID.MainHeroList).createHero(
                heroPatterns[i].heroClassID,
                1,
                this.container.get<HeroFactory>(ContainerID.HeroFactory),
            );

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i].equip) {
                let item = this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Item>(EntityID.Item, heroPatterns[i].equip[equipSlotID]);
                if (!item) {
                    debug(DebugNamespaceID.Warring)(sprintf('Предмет ID(%s) начальной экипировки не найден. Слот останется пустым.', heroPatterns[i].equip[equipSlotID]));
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
}