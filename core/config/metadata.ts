import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import {SerializeType} from '../source/Serializer.js';
import GameObject from '../source/GameObject.js';
import ItemStorageComponent from '../app/Components/ItemStorageComponent.js';
import ItemStorageSlotComponent from '../app/Components/ItemStorageSlotComponent.js';
import ItemStackSlot from '../app/RuntimeObjects/ItemStackSlot.js';
import ItemStack from '../app/RuntimeObjects/ItemStack.js';
import WalletComponent from '../app/Components/WalletComponent.js';
import HeroComponent from '../app/Components/HeroComponent.js';
import LevelRange from '../app/Components/ExperienceComponent.js';
import EquipSlotComponent from '../app/Components/EquipSlotComponent.js';
import CharacterAttribute from '../app/Components/CharacterAttribute.js';
import HealthPointsComponent from '../app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../app/Components/MagicPointsComponent.js';
import AttackController from '../app/Components/AttackController.js';
import PlayerComponent from '../app/Components/PlayerComponent.js';
import ArmorMaterial from '../app/Entities/ArmorMaterial.js';
import Quality from '../app/Entities/Quality.js';
import CharacterAttributeEntity from '../app/Entities/CharacterAttributeEntity.js';
import Currency from '../app/Entities/Currency.js';
import HeroRole from '../app/Entities/HeroRole.js';
import ItemCategory from '../app/Entities/ItemCategory.js';
import Item from '../app/Entities/Item.js';
import HeroClass from '../app/Entities/HeroClass.js';
import EquipSlot from '../app/Entities/EquipSlot.js';
import EquipSlotRule from '../app/Entities/EquipSlotRule.js';

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
            // linkType: LinkType.Realtime,
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
metadata[LevelRange.name] = {
    classname: LevelRange.name,
    prototype: LevelRange.prototype,
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
metadata[CharacterAttributeEntity.name] = {
    classname: CharacterAttributeEntity.name,
    prototype: CharacterAttributeEntity.prototype,
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
metadata[AttackController.name] = {
    classname: AttackController.name,
    prototype: AttackController.prototype,
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
metadata[CharacterAttributeEntity.name] = {
    classname: CharacterAttributeEntity.name,
    prototype: CharacterAttributeEntity.prototype,
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
            // target: (entityClassname: string, container: ContainerInterface) => {
            //     return container.get<RepositoryManager>(ContainerKey.EntityManager).getRepository()
            // },
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

export default metadata;