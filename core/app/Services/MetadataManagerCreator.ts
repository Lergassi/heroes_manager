import MetadataManager, {repositoryManagerFinderCallback} from '../../source/MetadataManager.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import {SerializeType} from '../../source/Serializer.js';
import CharacterAttributeData from '../Entities/CharacterAttributeData.js';
import Currency from '../Entities/Currency.js';
import Quality from '../Entities/Quality.js';
import HeroRole from '../Entities/HeroRole.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Item from '../Entities/Item.js';
import HeroClass from '../Entities/HeroClass.js';
import EquipSlot from '../Entities/EquipSlot.js';
import EquipSlotRule from '../Entities/EquipSlotRule.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import ItemStackSlot from '../RuntimeObjects/ItemStackSlot.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import HeroComponent from '../Components/HeroComponent.js';
import LevelRange from '../Components/ExperienceComponent.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import MagicPointsComponent from '../Components/MagicPointsComponent.js';
import AttackController from '../Components/AttackController.js';
import PlayerComponent from '../Components/PlayerComponent.js';
import WalletComponent from '../Components/WalletComponent.js';
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';

export default class MetadataManagerCreator {
    create(): MetadataManager {
        let metadataManager = new MetadataManager();

        metadataManager.addMetadata({
            module: ArmorMaterial,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: CharacterAttribute,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: Currency,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: Quality,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: HeroRole,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: ItemCategory,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: Item,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: HeroClass,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: EquipSlot,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
            finderCallback: repositoryManagerFinderCallback,
        });
        metadataManager.addMetadata({
            module: EquipSlotRule,
            mapping: {
                _heroClass: {
                    type: SerializeType.Link,
                },
                _itemCategories: {
                    type: SerializeType.LinkCollection,
                },
            },
        });
        //GameObject, Component
        metadataManager.addMetadata({
            module: GameObject,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: ItemStorageComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
                },
                _gameObject: {
                    type: SerializeType.Link,
                },
                _size: {
                    type: SerializeType.Number,
                },
            },
        });
        metadataManager.addMetadata({
            module: ItemStorageSlotComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
                },
                _gameObject: {
                    type: SerializeType.Link,
                },
                _itemStack: {
                    type: SerializeType.Object,
                },
            },
        });
        metadataManager.addMetadata({
            module: ItemStackSlot,
            mapping: {
                _itemStack: {
                    type: SerializeType.Object,
                },
            },
        });
        metadataManager.addMetadata({
            module: ItemStack,
            mapping: {
                _id: {
                    type: SerializeType.String,
                },
                _item: {
                    type: SerializeType.Link,
                },
                _count: {
                    type: SerializeType.Number,
                },
            },
        });
        metadataManager.addMetadata({
            module: HeroComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: LevelRange,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: EquipSlotComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: ItemStackSlot,
            mapping: {
                _itemStack: {
                    type: SerializeType.Object,
                },
            },
        });
        metadataManager.addMetadata({
            module: CharacterAttribute,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: HealthPointsComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: MagicPointsComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: AttackController,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: PlayerComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
                },
                _gameObject: {
                    type: SerializeType.Link,
                },
            },
        });
        metadataManager.addMetadata({
            module: LevelRange,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: WalletComponent,
            mapping: {
                _id: {
                    type: SerializeType.String,
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
        });
        metadataManager.addMetadata({
            module: AutoIncrementIDGenerator,
            mapping: {
                _currentId: {
                    type: SerializeType.Number,
                },
            },
        });

        return metadataManager;
    }
}