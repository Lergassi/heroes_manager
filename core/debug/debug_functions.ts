import debug from 'debug';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import Experience from '../app/Components/Experience.js';
import LifeStateController from '../app/Components/LifeStateController.js';
import CharacterAttributeInterface from '../app/Decorators/CharacterAttributeInterface.js';
import EquipSlotInterface from '../app/Interfaces/EquipSlotInterface.js';
import {debug_header} from '../debug_functions.js';
import GameObject from '../source/GameObject.js';
import CharacterAttribute from '../app/Components/CharacterAttribute.js';
import EquipSlotComponent from '../app/Components/EquipSlotComponent.js';
import HealthPoints from '../app/Components/HealthPoints.js';
import AttackController from '../app/Components/AttackController.js';
import MagicPointsComponent from '../app/Components/MagicPointsComponent.js';
import HeroComponent from '../app/Components/HeroComponent.js';
import ItemStack from '../app/RuntimeObjects/ItemStack.js';
import ItemStorageSlotComponent from '../app/Components/ItemStorages/ItemStorageSlotComponent.js';
import Wallet from '../app/Components/Wallet.js';
import ItemStorageComponent from '../app/Components/ItemStorages/ItemStorageComponent.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import ContainerInterface from '../source/ContainerInterface.js';
import LevelRange from '../app/Components/Experience.js';
import EntityManager from '../source/EntityManager.js';
import Item from '../app/Entities/Item.js';
import {CharacterAttributeID} from '../types/enums/CharacterAttributeID.js';
import {EquipSlotID} from '../types/enums/EquipSlotID.js';
import {ServiceID} from '../types/enums/ServiceID.js';
import EntityManagerInterface from '../app/Interfaces/EntityManagerInterface.js';
import {DebugNamespaceID} from '../types/enums/DebugNamespaceID.js';
import {ComponentID} from '../types/enums/ComponentID.js';
import Icon from '../app/Entities/Icon.js';
import {assert, assertNotNil} from '../source/assert.js';

export function debugEntity(entity) {
    debug(DebugNamespaceID.Debug)('%j', {
        classname: entity.constructor.name,
        _id: entity['_id'],
        _name: entity['_name'],
        _alias: entity['_alias'],
    });
}

export function debugItem(item: Item) {
    assertNotNil(item);
    debug(DebugNamespaceID.Debug)('%j', {
        id: item['_id'],
        itemCategoryId: item['_itemCategory']?.['_id'],
        stackSize: item['_stackSize'],
        icon: item['_icon']?.['_id'],
        quality: item['_quality']?.['_id'],
        // attributes: item['_characterAttributes']?.['_id'],
    });
}

export function debugItemCategory(itemCategory) {
    debug(DebugNamespaceID.Debug)('%j', {
        classname: itemCategory.constructor.name,
        _id: itemCategory['_id'],
        _name: itemCategory['_name'],
        _alias: itemCategory['_alias'],
        _parent: itemCategory['_parent'] ? {
            _id: itemCategory['_parent']['_id'],
            _name: itemCategory['_parent']['_name'],
        } : undefined,
    });
}

export function debugEquipSlot(equipSlot) {
    debug(DebugNamespaceID.Debug)(_.repeat('-', 64));
    debug(DebugNamespaceID.Debug)('%j', {
        classname: equipSlot.constructor.name,
        _id: equipSlot['_id'],
        _name: equipSlot['_name'],
        _alias: equipSlot['_alias'],
    });

    equipSlot['_rules'].forEach((equipSlotRule) => {
        debug(DebugNamespaceID.Debug)('%j', {
            classname: equipSlotRule.constructor.name,
            _heroClass: {
                id: equipSlotRule['_heroClass']['_id'],
                classname: equipSlotRule['_heroClass']['_name'],
            },
            itemCategories: equipSlotRule['_itemCategories'].map((itemCategory) => {
                return {
                    id: itemCategory['_id'],
                    classname: itemCategory['_name'],
                };
            }),
        });
    })
}

export function debugRepository(repository) {
    for (let i = 0; i < repository['_items'].length; i++) {
        debugEntity(repository['_items'][i]);
    }
}

export function debugEntityManager(entityManager: EntityManagerInterface) {
    debug(DebugNamespaceID.Debug)(EntityManager.name);
    for (const repositoryKey in entityManager['_repositories']) {
        debug(DebugNamespaceID.Debug)(sprintf('%sRepository.length: %s',
            repositoryKey,
            entityManager['_repositories'][repositoryKey]['_items'].length,
        ));
        debugRepository(entityManager['_repositories'][repositoryKey]);
    }
}

export function debugGameObject(gameObject: GameObject) {
    debug(DebugNamespaceID.Debug)('%j', {
        gameObject: GameObject.name,
        _id: gameObject['_id'],
        _tags: _.join(gameObject['_tags'], ', '),
    });
}

export function debugLevelComponent(levelComponent: LevelRange) {
    debug(DebugNamespaceID.Debug)('%j', {
        component: LevelRange.name,
        _id: levelComponent['_id'],
        _level: levelComponent['_level'],
        _maxLevel: levelComponent['_maxLevel'],
        _exp: levelComponent['_exp'],
    });
}

export function debugHero(hero: GameObject) {
    let heroComponent: HeroComponent = <HeroComponent>hero.getComponentByName(HeroComponent.name);
    debugGameObject(hero);

    debug(DebugNamespaceID.Debug)('%j', {
        component: HeroComponent.name,
        _id: heroComponent['_id'],
        _heroClass: heroComponent['_heroClass']['_name'],
    });

    debugLevelComponent(hero.getComponentByName<LevelRange>(LevelRange.name));

    let healthPointsComponent: HealthPoints = <HealthPoints>hero.getComponentByName(ComponentID.HealthPoints);
    debug(DebugNamespaceID.Debug)('%j', {
        component: ComponentID.HealthPoints,
        _id: healthPointsComponent['_id'],
        _currentHealthPoints: healthPointsComponent['_currentHealthPoints'],
        _maxHealthPoints: healthPointsComponent['_maxHealthPoints'],
        _state: healthPointsComponent['_state'],
    });

    let magicPointsComponent: MagicPointsComponent = <MagicPointsComponent>hero.getComponentByName(MagicPointsComponent.name);
    debug(DebugNamespaceID.Debug)('%j', {
        component: MagicPointsComponent.name,
        _id: magicPointsComponent['_id'],
        _currentMagicPoints: magicPointsComponent['_currentMagicPoints'],
        _maxMagicPoints: magicPointsComponent['_maxMagicPoints'],
    });

    let attackPowerComponent: AttackController = <AttackController>hero.getComponentByName(AttackController.name);
    debug(DebugNamespaceID.Debug)('%j', {
        component: AttackController.name,
        _id: attackPowerComponent['_id'],
        _baseMinAttackPower: attackPowerComponent['_baseMinAttackPower'],
        _baseMaxAttackPower: attackPowerComponent['_baseMaxAttackPower'],
    });

    debug(DebugNamespaceID.Debug)('# characterAttribute: finalValue (_baseValue)');
    hero.findComponentsByName(CharacterAttribute.name).map((characterAttributeComponent) => {
        debug(DebugNamespaceID.Debug)('%j', {
            component: CharacterAttribute.name,
            _id: characterAttributeComponent['_id'],
            _characterAttribute: characterAttributeComponent['_characterAttribute']['_name'],
            finalValue: characterAttributeComponent['finalValue'],
            _baseValue: characterAttributeComponent['_baseValue'],
        });
    });

    debug(DebugNamespaceID.Debug)('# equip');
    hero.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name).map((equipSlotComponent) => {
        debug(DebugNamespaceID.Debug)('%j', {
            component: EquipSlotComponent.name,
            _id: equipSlotComponent['_id'],
            _equipSlot: equipSlotComponent['_equipSlot']['_name'],
            itemStack: equipSlotComponent.isFree() ?
                'free' :
                equipSlotComponent['_itemStack']['_item']['_name']
            ,
        });
    });
}

export function debugHeroes(container: ContainerInterface) {
    debug(DebugNamespaceID.Debug)('# heroes');
    container.get<GameObjectStorage>(ServiceID.GameObjectStorage)
        .findByTag('#hero')
        .map((wallet) => {
            debugHero(wallet);
        });
}

export function debugItemStack(itemStack: ItemStack) {
    if (itemStack !== undefined) {
        debug(DebugNamespaceID.Debug)(sprintf(
            '%s(%s): %s',
            itemStack['_item']['_name'],
            itemStack['_item']['_name'],
            itemStack['_item']['_alias'],
            itemStack['_count'],
        ));
    } else {
        debug(DebugNamespaceID.Debug)(undefined);
    }
}

// export function debugItemStorage(itemStorage: GameObject) {
//     const itemStorageComponent = itemStorage.getComponentByName(ItemStorageComponent.name);
//     debugGameObject(itemStorage);
//     debug('debug')('%j', {
//         component: ItemStorageComponent.name,
//         _id: itemStorageComponent['_id'],
//         busy: itemStorageComponent['busyItemStorageSlotCount'],
//         size: itemStorageComponent['_size'],
//     });
//
//     // let itemStorageSlotComponents = itemStorage.findComponentsByName(ItemStorageSlotComponent.name);
//     let itemStorageSlotComponents = itemStorage.getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);
//     itemStorageSlotComponents.map((itemStorageSlotComponent: ItemStorageSlotComponent) => {
//         debug('debug')('%j', {
//             component: ItemStorageSlotComponent.name,
//             _id: itemStorageSlotComponent['_id'],
//             itemStack: itemStorageSlotComponent.isFree() ? 'free' : {
//                 item: {
//                     name: itemStorageSlotComponent['_itemStack']['_item']['_name'],
//                     alias: itemStorageSlotComponent['_itemStack']['_item']['_alias'],
//                 },
//                 count: itemStorageSlotComponent['_itemStack']['_count'],
//             },
//         });
//     });
// }

export function debugItemStorage(itemStorage: GameObject | ItemStorageComponent) {
    let itemStorageComponent;
    let itemStorageSlotComponents;
    if (itemStorage instanceof GameObject) {
        itemStorageComponent = itemStorage.getComponentByName(ItemStorageComponent.name);
        itemStorageSlotComponents = itemStorage.getComponents<ItemStorageSlotComponent>(ItemStorageSlotComponent);
    } else {
        itemStorageComponent = itemStorage;
        itemStorageSlotComponents = itemStorageComponent.itemStorageSlotComponents;
    }

    // debugGameObject(itemStorage);
    debug(DebugNamespaceID.Debug)('%j', {
        component: ItemStorageComponent.name,
        _id: itemStorageComponent['_id'],
        busy: itemStorageComponent['busyItemStorageSlotCount'],
        size: itemStorageComponent['_size'],
    });

    // let itemStorageSlotComponents = itemStorage.findComponentsByName(ItemStorageSlotComponent.name);

    itemStorageSlotComponents.map((itemStorageSlotComponent: ItemStorageSlotComponent) => {
        debug(DebugNamespaceID.Debug)('%j', {
            component: ItemStorageSlotComponent.name,
            _id: itemStorageSlotComponent['_id'],
            itemStack: itemStorageSlotComponent.isFree() ? 'free' : {
                item: {
                    name: itemStorageSlotComponent['_itemStack']['_item']['_name'],
                    alias: itemStorageSlotComponent['_itemStack']['_item']['_alias'],
                },
                count: itemStorageSlotComponent['_itemStack']['_count'],
            },
        });
    });
}

export function debugItemStorages(itemStorages: GameObject[]) {
    debug(DebugNamespaceID.Debug)('# item storages');
    itemStorages
        .map((itemStorage) => {
            debugItemStorage(itemStorage);
        });
}

export function debugWallet(wallet: GameObject) {
    debugGameObject(wallet);
    let walletComponent = wallet.getComponentByName(ComponentID.Wallet);
    debug(DebugNamespaceID.Debug)('%j', {
        component: Wallet.name,
        _id: walletComponent['_id'],
        name: walletComponent['_currency']['_name'],
        value: walletComponent['_value'],
    });
}

export function debugWallets(container: ContainerInterface) {
    debug(DebugNamespaceID.Debug)('# wallets');
    container.get<GameObjectStorage>(ServiceID.GameObjectStorage)
        .findByTag('#wallet')
        .map((wallet) => {
            debugWallet(wallet);
        });
}

export function debugPlayerEnv(container: ContainerInterface) {
    debugWallets(container);
    // debugItemStorages(container);
    debugHeroes(container);
}

export function debugContainer(container: ContainerInterface) {
    if (Object.keys(container['_services']).length) {
        for (const serviceKey in container['_services']) {
            debug(DebugNamespaceID.Debug)(sprintf(
                '%s',
                serviceKey,
            ));
        }
    } else {
        debug(DebugNamespaceID.Debug)('Контейнер пустой.');
    }
}

export function debugPlayerGameObject(container: ContainerInterface) {
    let playerGameObject = container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByTag('#player');
    debug(DebugNamespaceID.Debug)('# player');
    debugGameObject(playerGameObject);
    debugLevelComponent(playerGameObject.getComponentByName(LevelRange.name));
}

export function debugGameObjectStorage(gameObjectStorage: GameObjectStorage) {
    debug(DebugNamespaceID.Debug)('GameObjectStorage.length: ' + gameObjectStorage['_gameObjects'].length);
    for (let i = 0; i < gameObjectStorage['_gameObjects'].length; i++) {
        debug(DebugNamespaceID.Debug)(sprintf('_id: %s, _name: %s', gameObjectStorage['_gameObjects'][i]['_id'], gameObjectStorage['_gameObjects'][i]['_name']));
    }
}

export function debugItemList(items: Item[]) {
    for (let i = 0; i < items.length; i++) {
        debug(DebugNamespaceID.Debug)('%j', {
            name: items[i]['name'] || items[i]['_name'],
            alias: items[i].id,
        });
    }
    separator();
}

function separator() {
    console.log(_.repeat('-', 64));
}

export function debug_detailHero(hero: GameObject) {
    let characterAttributeIDs = [
        CharacterAttributeID.Strength,
        CharacterAttributeID.Agility,
        CharacterAttributeID.Intelligence,
        CharacterAttributeID.AttackPower,
    ];

    let equipSlotIDs = [
        EquipSlotID.Head,
        EquipSlotID.Shoulders,
        EquipSlotID.Chest,
        EquipSlotID.Wrist,
        EquipSlotID.Hands,
        EquipSlotID.Waist,
        EquipSlotID.Legs,
        EquipSlotID.Foots,
        EquipSlotID.Neck,
        EquipSlotID.Finger01,
        EquipSlotID.Finger02,
        EquipSlotID.Trinket,
        EquipSlotID.RightHand,
        EquipSlotID.LeftHand,
    ];

    debug_header('debug_detailHero');
    // hero.get<HeroComponent>(ComponentID.Hero)?.renderByRequest(this);
    hero.get<LifeStateController>(ComponentID.LifeStateController)?.debug();
    hero.get<Experience>(ComponentID.Experience)?.debug();
    hero.get<HealthPoints>(ComponentID.HealthPoints)?.debug();
    debug_header('character_attributes');
    _.map(characterAttributeIDs, (ID) => {
        hero.get<CharacterAttributeInterface>(ID).debug();
    });
    debug_header('equip_slots');
    _.map(equipSlotIDs, (ID) => {
        hero.get<EquipSlotInterface>(ID)?.debug();
    });
}