import path from 'path';
import config from '../config/main.js';
import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import RepositoryManagerFileLoader from './Services/RepositoryManagerFileLoader.js';
import UserFactory from './Factories/UserFactory.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import HeroFactory from './Factories/HeroFactory.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import ItemStorageManager from './Services/ItemStorageManager.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
import ContainerInterface from '../source/ContainerInterface.js';
import ItemStackFactory from './Factories/ItemStackFactory.js';
import Item from './Entities/Item.js';
import RepositoryManager from '../source/RepositoryManager.js';
import EquipManager from './Services/EquipManager.js';
import DebugEntitiesCommand from './Commands/DebugCommands/DebugEntitiesCommand.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Serializer, {SerializeType} from '../source/Serializer.js';
import GameObject from '../source/GameObject.js';
import ItemStorageComponent from './Components/ItemStorageComponent.js';
import ItemStorageSlotComponent from './Components/ItemStorageSlotComponent.js';
import ItemStackSlot from './RuntimeObjects/ItemStackSlot.js';
import ItemStack from './RuntimeObjects/ItemStack.js';
import WalletComponent from './Components/WalletComponent.js';
import HeroComponent from './Components/HeroComponent.js';
import LevelComponent from './Components/LevelComponent.js';
import EquipSlotComponent from './Components/EquipSlotComponent.js';
import CharacterAttributeComponent from './Components/CharacterAttributeComponent.js';
import HealthPointsComponent from './Components/HealthPointsComponent.js';
import MagicPointsComponent from './Components/MagicPointsComponent.js';
import AttackPowerComponent from './Components/AttackPowerComponent.js';
import PlayerComponent from './Components/PlayerComponent.js';
import ArmorMaterial from './Entities/ArmorMaterial.js';
import Quality from './Entities/Quality.js';
import CharacterAttribute from './Entities/CharacterAttribute.js';
import Currency from './Entities/Currency.js';
import HeroRole from './Entities/HeroRole.js';
import ItemCategory from './Entities/ItemCategory.js';
import HeroClass from './Entities/HeroClass.js';
import EquipSlot from './Entities/EquipSlot.js';
import EquipSlotRule from './Entities/EquipSlotRule.js';

export default class CoreContainerConfigure extends ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);
        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack
        container.set<RepositoryManager>('core.repositoryManager', (container) => {
            return (new RepositoryManagerFileLoader()).load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
        });
        container.set<Serializer>('core.serializer', (container) => {
            let metadata = {};
            metadata[AutoIncrementIDGenerator.name] = {
                classname: AutoIncrementIDGenerator.name,
                prototype: AutoIncrementIDGenerator.prototype,
                serviceName: 'player.realtimeObjectIdGenerator',
                mapping: {
                    _currentId: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[GameObject.name] = {
                classname: GameObject.name,
                prototype: GameObject.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _tags: {
                        type: SerializeType.Collection,
                    },
                    _components: {
                        type: SerializeType.Collection,
                    },
                },
            };
            metadata[ItemStorageComponent.name] = {
                classname: ItemStorageComponent.name,
                prototype: ItemStorageComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _size: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[ItemStorageSlotComponent.name] = {
                classname: ItemStorageSlotComponent.name,
                prototype: ItemStorageSlotComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _itemStackSlot: {
                        type: SerializeType.Object,
                    },
                },
            };
            metadata[ItemStackSlot.name] = {
                classname: ItemStackSlot.name,
                prototype: ItemStackSlot.prototype,
                mapping: {
                    _itemStack: {
                        type: SerializeType.Object,
                    },
                },
            };
            metadata[ItemStack.name] = {
                classname: ItemStack.name,
                prototype: ItemStack.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _item: {
                        type: SerializeType.Link,
                    },
                    _count: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[WalletComponent.name] = {
                classname: WalletComponent.name,
                prototype: WalletComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _currency: {
                        type: SerializeType.Link,
                    },
                    _value: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[HeroComponent.name] = {
                classname: HeroComponent.name,
                prototype: HeroComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _heroClass: {
                        type: SerializeType.Link,
                    },
                },
            };
            metadata[LevelComponent.name] = {
                classname: LevelComponent.name,
                prototype: LevelComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _level: {
                        type: SerializeType.Number,
                    },
                    _maxLevel: {
                        type: SerializeType.Number,
                    },
                    _exp: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[EquipSlotComponent.name] = {
                classname: EquipSlotComponent.name,
                prototype: EquipSlotComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _equipSlot: {
                        type: SerializeType.Link,
                    },
                    _itemStackSlot: {
                        type: SerializeType.Object,
                    },
                },
            };
            metadata[CharacterAttributeComponent.name] = {
                classname: CharacterAttributeComponent.name,
                prototype: CharacterAttributeComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _characterAttribute: {
                        type: SerializeType.Link,
                    },
                    _baseValue: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[HealthPointsComponent.name] = {
                classname: HealthPointsComponent.name,
                prototype: HealthPointsComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _currentHealthPoints: {
                        type: SerializeType.Number,
                    },
                    _maxHealthPoints: {
                        type: SerializeType.Number,
                    },
                    _state: {
                        type: SerializeType.String,
                    },
                },
            };
            metadata[MagicPointsComponent.name] = {
                classname: MagicPointsComponent.name,
                prototype: MagicPointsComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _currentMagicPoints: {
                        type: SerializeType.Number,
                    },
                    _maxMagicPoints: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[AttackPowerComponent.name] = {
                classname: AttackPowerComponent.name,
                prototype: AttackPowerComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                    _baseMinAttackPower: {
                        type: SerializeType.Number,
                    },
                    _baseMaxAttackPower: {
                        type: SerializeType.Number,
                    },
                    _dependentCharacterAttributeComponents: {
                        type: SerializeType.LinkCollection,
                    },
                },
            };
            metadata[PlayerComponent.name] = {
                classname: PlayerComponent.name,
                prototype: PlayerComponent.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _gameObject: {
                        type: SerializeType.Link,
                    },
                },
            };
            metadata[ArmorMaterial.name] = {
                classname: ArmorMaterial.name,
                prototype: ArmorMaterial.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[Quality.name] = {
                classname: Quality.name,
                prototype: Quality.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[CharacterAttribute.name] = {
                classname: CharacterAttribute.name,
                prototype: CharacterAttribute.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[Currency.name] = {
                classname: Currency.name,
                prototype: Currency.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[HeroRole.name] = {
                classname: HeroRole.name,
                prototype: HeroRole.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                },
            };
            metadata[ItemCategory.name] = {
                classname: ItemCategory.name,
                prototype: ItemCategory.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                    _parent: {
                        type: SerializeType.Link,
                    },
                },
            };
            metadata[Item.name] = {
                classname: Item.name,
                prototype: Item.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _stackSize: {
                        type: SerializeType.Number,
                    },
                    _itemLevel: {
                        type: SerializeType.Number,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                    _isEquipable: {
                        type: SerializeType.Boolean,
                    },
                    _itemCategory: {
                        type: SerializeType.Link,
                    },
                    _quality: {
                        type: SerializeType.Link,
                    },
                    _armorMaterial: {
                        type: SerializeType.Link,
                    },
                },
            };
            metadata[HeroClass.name] = {
                classname: HeroClass.name,
                prototype: HeroClass.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                    _heroRole: {
                        type: SerializeType.Link,
                    },
                    _availableWeaponItemCategories: {
                        type: SerializeType.LinkCollection,
                    },
                    _availableArmorMaterials: {
                        type: SerializeType.LinkCollection,
                    },
                    _mainCharacterAttributes: {
                        type: SerializeType.LinkCollection,
                    },
                },
            };
            metadata[EquipSlot.name] = {
                classname: EquipSlot.name,
                prototype: EquipSlot.prototype,
                mapping: {
                    _id: {
                        type: SerializeType.Number,
                    },
                    _name: {
                        type: SerializeType.String,
                    },
                    _alias: {
                        type: SerializeType.String,
                    },
                    _description: {
                        type: SerializeType.String,
                    },
                    _sort: {
                        type: SerializeType.Number,
                    },
                    _rules: {
                        type: SerializeType.Collection,
                    },
                },
            };
            metadata[EquipSlotRule.name] = {
                classname: EquipSlotRule.name,
                prototype: EquipSlotRule.prototype,
                mapping: {
                    _heroClass: {
                        type: SerializeType.Link,
                    },
                    _itemCategories: {
                        type: SerializeType.LinkCollection,
                    },
                },
            };

            return new Serializer(metadata, container);
        });//end set serializer

        this._gameConsoleConfigure(container);

        debug('core:log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        /* DEBUG */
        gameConsole.register(new DebugEntitiesCommand(container));
    }
}