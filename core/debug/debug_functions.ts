import debug from 'debug';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import GameObject from '../source/GameObject.js';
import CharacterAttributeComponent from '../app/Components/CharacterAttributeComponent.js';
import EquipSlotComponent from '../app/Components/EquipSlotComponent.js';
import HealthPointsComponent from '../app/Components/HealthPointsComponent.js';
import AttackPowerComponent from '../app/Components/AttackPowerComponent.js';
import MagicPointsComponent from '../app/Components/MagicPointsComponent.js';
import HeroComponent from '../app/Components/HeroComponent.js';
import ItemStack from '../app/RuntimeObjects/ItemStack.js';
import ItemStorageSlotComponent from '../app/Components/ItemStorageSlotComponent.js';
import WalletComponent from '../app/Components/WalletComponent.js';
import ItemStorageComponent from '../app/Components/ItemStorageComponent.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import ContainerInterface from '../source/ContainerInterface.js';
import LevelComponent from '../app/Components/LevelComponent.js';
import EntityManager from '../source/EntityManager.js';

export function debugEntity(entity) {
    debug('debug')('%j', {
        classname: entity.constructor.name,
        _id: entity['_id'],
        _name: entity['_name'],
        _alias: entity['_alias'],
    });
}

export function debugItem(item) {
    debug('debug')('%j', {
        classname: item.constructor.name,
        _id: item['_id'],
        _name: item['_name'],
        _alias: item['_alias'],
        _itemCategory: {    //todo: Для дебага с ссылкой на объект сделать отдельный класс.
            _id: item['_itemCategory']['_id'],
            _name: item['_itemCategory']['_name'],
        },
        _stackSize: item['_stackSize'],
        _itemLevel: item['_itemLevel'],
    });
}

export function debugItemCategory(itemCategory) {
    debug('debug')('%j', {
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
    debug('debug')(_.repeat('-', 64));
    debug('debug')('%j', {
        classname: equipSlot.constructor.name,
        _id: equipSlot['_id'],
        _name: equipSlot['_name'],
        _alias: equipSlot['_alias'],
    });

    equipSlot['_rules'].forEach((equipSlotRule) => {
        debug('debug')('%j', {
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

export function debugEntityManager(entityManager: EntityManager) {
    debug('debug')(EntityManager.name);
    for (const repositoryKey in entityManager['_repositories']) {
        debug('debug')(sprintf('%sRepository.length: %s',
            repositoryKey,
            entityManager['_repositories'][repositoryKey]['_items'].length,
        ));
        debugRepository(entityManager['_repositories'][repositoryKey]);
    }
}

export function debugGameObject(gameObject: GameObject) {
    debug('debug')('%j', {
        gameObject: GameObject.name,
        _id: gameObject['_id'],
        _tags: _.join(gameObject['_tags'], ', '),
    });
}

export function debugLevelComponent(levelComponent: LevelComponent) {
    debug('debug')('%j', {
        component: LevelComponent.name,
        _id: levelComponent['_id'],
        _level: levelComponent['_level'],
        _maxLevel: levelComponent['_maxLevel'],
        _exp: levelComponent['_exp'],
    });
}

export function debugHero(hero: GameObject) {
    let heroComponent: HeroComponent = <HeroComponent>hero.getComponentByName(HeroComponent.name);
    debugGameObject(hero);

    debug('debug')('%j', {
        component: HeroComponent.name,
        _id: heroComponent['_id'],
        _heroClass: heroComponent['_heroClass']['_name'],
    });

    debugLevelComponent(hero.getComponentByName<LevelComponent>(LevelComponent.name));

    let healthPointsComponent: HealthPointsComponent = <HealthPointsComponent>hero.getComponentByName(HealthPointsComponent.name);
    debug('debug')('%j', {
        component: HealthPointsComponent.name,
        _id: healthPointsComponent['_id'],
        _currentHealthPoints: healthPointsComponent['_currentHealthPoints'],
        _maxHealthPoints: healthPointsComponent['_maxHealthPoints'],
        _state: healthPointsComponent['_state'],
    });

    let magicPointsComponent: MagicPointsComponent = <MagicPointsComponent>hero.getComponentByName(MagicPointsComponent.name);
    debug('debug')('%j', {
        component: MagicPointsComponent.name,
        _id: magicPointsComponent['_id'],
        _currentMagicPoints: magicPointsComponent['_currentMagicPoints'],
        _maxMagicPoints: magicPointsComponent['_maxMagicPoints'],
    });

    let attackPowerComponent: AttackPowerComponent = <AttackPowerComponent>hero.getComponentByName(AttackPowerComponent.name);
    debug('debug')('%j', {
        component: AttackPowerComponent.name,
        _id: attackPowerComponent['_id'],
        _baseMinAttackPower: attackPowerComponent['_baseMinAttackPower'],
        _baseMaxAttackPower: attackPowerComponent['_baseMaxAttackPower'],
    });

    debug('debug')('# characterAttribute: finalValue (_baseValue)');
    hero.findComponentsByName(CharacterAttributeComponent.name).map((characterAttributeComponent) => {
        debug('debug')('%j', {
            component: CharacterAttributeComponent.name,
            _id: characterAttributeComponent['_id'],
            _characterAttribute: characterAttributeComponent['_characterAttribute']['_name'],
            finalValue: characterAttributeComponent['finalValue'],
            _baseValue: characterAttributeComponent['_baseValue'],
        });
    });

    debug('debug')('# equip');
    hero.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name).map((equipSlotComponent) => {
        debug('debug')('%j', {
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
    debug('debug')('# heroes');
    container.get<GameObjectStorage>('player.gameObjectStorage')
        .findByTag('#hero')
        .map((wallet) => {
            debugHero(wallet);
        });
}

export function debugItemStack(itemStack: ItemStack) {
    if (itemStack !== undefined) {
        debug('debug')(sprintf(
            '%s(%s): %s',
            itemStack['_item']['_name'],
            itemStack['_item']['_name'],
            itemStack['_item']['_alias'],
            itemStack['_count'],
        ));
    } else {
        debug('debug')(undefined);
    }
}

export function debugItemStorage(itemStorage: GameObject) {
    const itemStorageComponent = itemStorage.getComponentByName(ItemStorageComponent.name);
    debugGameObject(itemStorage);
    debug('debug')('%j', {
        component: ItemStorageComponent.name,
        _id: itemStorageComponent['_id'],
        busy: itemStorageComponent['busyItemStorageSlotCount'],
        size: itemStorageComponent['_size'],
    });

    let itemStorageSlotComponents = itemStorage.findComponentsByName(ItemStorageSlotComponent.name);
    itemStorageSlotComponents.map((itemStorageSlotComponent: ItemStorageSlotComponent) => {
        debug('debug')('%j', {
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

export function debugItemStorages(container: ContainerInterface) {
    debug('debug')('# item storages');
    container.get<GameObjectStorage>('player.gameObjectStorage')
        .findByTag('#item_storage')
        .map((itemStorage) => {
            debugItemStorage(itemStorage);
        });
}

export function debugWallet(wallet: GameObject) {
    debugGameObject(wallet);
    let walletComponent = wallet.getComponentByName(WalletComponent.name);
    debug('debug')('%j', {
        component: WalletComponent.name,
        _id: walletComponent['_id'],
        name: walletComponent['_currency']['_name'],
        value: walletComponent['_value'],
    });
}

export function debugWallets(container: ContainerInterface) {
    debug('debug')('# wallets');
    container.get<GameObjectStorage>('player.gameObjectStorage')
        .findByTag('#wallet')
        .map((wallet) => {
            debugWallet(wallet);
        });
}

export function debugPlayerEnv(container: ContainerInterface) {
    debugWallets(container);
    debugItemStorages(container);
    debugHeroes(container);
}

export function debugContainer(container: ContainerInterface) {
    if (Object.keys(container['_services']).length) {
        for (const serviceKey in container['_services']) {
            debug('debug')(sprintf(
                '%s',
                serviceKey,
            ));
        }
    } else {
        debug('debug')('Контейнер пустой.');
    }
}

// export function debugGameObjectStorage(gameObjectStorage: GameObjectStorage) {
//     debug('debug')('%j', {
//         name: GameObjectStorage.name,
//         length: gameObjectStorage['_gameObjects'].length,
//     });
//     for (let i = 0; i < gameObjectStorage['_gameObjects'].length; i++) {
//         debug('debug')('%j', {
//
//         });
//     }
// }

export function debugPlayerGameObject(container: ContainerInterface) {
    let playerGameObject = container.get<GameObjectStorage>('player.gameObjectStorage').getOneByTag('#player');
    debug('debug')('# player');
    debugGameObject(playerGameObject);
    debugLevelComponent(playerGameObject.getComponentByName(LevelComponent.name));
}

export function debugGameObjectStorage(gameObjectStorage: GameObjectStorage) {
    debug('debug')('GameObjectStorage.length: ' + gameObjectStorage['_gameObjects'].length);
    for (let i = 0; i < gameObjectStorage['_gameObjects'].length; i++) {
        debug('debug')(sprintf('_id: %s, _name: %s', gameObjectStorage['_gameObjects'][i]['_id'], gameObjectStorage['_gameObjects'][i]['_name']));
    }
}