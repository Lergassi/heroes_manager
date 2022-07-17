import debug from 'debug';
import {sprintf} from 'sprintf-js';
import ItemCategory from '../app/Entities/ItemCategory.js';
import Item from '../app/Entities/Item.js';
import ArmorMaterial from '../app/Entities/ArmorMaterial.js';
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

//todo: В отдельный класс. Сделать единый механизм метаданных для всего проекта.
export let meta = {
    'Item': {
        detailDebugFunction: debugItem,
    },
    'ItemCategory': {
        detailDebugFunction: debugItemCategory,
    },
    'EquipSlot': {
        detailDebugFunction: debugEquipSlot,
    }
};

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

export function debugRepositoryManager(repositoryManager) {
    for (const repositoryKey in repositoryManager['_repositories']) {
        debug('debug')(sprintf('%sRepository.length: %s',
            repositoryKey,
            repositoryManager['_repositories'][repositoryKey]['_items'].length,
        ));
        debugRepository(repositoryManager['_repositories'][repositoryKey]);
    }
}

export function debugHero(hero: GameObject) {
    let heroComponent: HeroComponent = <HeroComponent>hero.getComponentByName(HeroComponent.name);
    debug('debug')(sprintf(
        'heroClass: %s',
        heroComponent['_heroClass']['_name'],
    ));

    let healthPointsComponent: HealthPointsComponent = <HealthPointsComponent>hero.getComponentByName(HealthPointsComponent.name);
    debug('debug')(sprintf(
        'health points: %s(%s), %s',
        healthPointsComponent['_currentHealthPoints'],
        healthPointsComponent['_maxHealthPoints'],
        healthPointsComponent['_state'],
    ));

    let magicPointsComponent: MagicPointsComponent = <MagicPointsComponent>hero.getComponentByName(MagicPointsComponent.name);
    debug('debug')(sprintf(
        'magic points: %s(%s)',
        magicPointsComponent['_currentMagicPoints'],
        magicPointsComponent['_maxMagicPoints'],
    ));

    let attackPowerComponent: AttackPowerComponent = <AttackPowerComponent>hero.getComponentByName(AttackPowerComponent.name);
    debug('debug')(sprintf(
        'attack power: %s-%s',
        attackPowerComponent['_baseMinAttackPower'],
        attackPowerComponent['_baseMaxAttackPower'],
    ));

    debug('debug')('# characterAttribute: finalValue (_baseValue)');
    hero.findComponentsByName(CharacterAttributeComponent.name).map((characterAttributeComponent) => {
        debug('debug')(sprintf(
            '%s: %s(%s)',
            characterAttributeComponent['_characterAttribute']['_name'],
            characterAttributeComponent['finalValue'],
            characterAttributeComponent['_baseValue'],
        ));
    });

    debug('debug')('# equip:');
    hero.findComponentsByName(EquipSlotComponent.name).map((equipSlotComponent) => {
        debug('debug')(sprintf(
            '%s: %s',
            equipSlotComponent['_equipSlot']['_name'],
            equipSlotComponent['_itemStackSlot'].isFree() ? 'free' : equipSlotComponent['_itemStackSlot']['_itemStack']['_item']['_name'],
        ));
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
    let itemStorageSlotComponents = itemStorage.findComponentsByName(ItemStorageSlotComponent.name);
    itemStorageSlotComponents.map((itemStorageSlotComponent: ItemStorageSlotComponent) => {
        let msg = itemStorageSlotComponent.isBusy() ?
            sprintf(
                '%s(%s): %s',
                itemStorageSlotComponent['_itemStackSlot']['_itemStack']['_item']['_name'],
                itemStorageSlotComponent['_itemStackSlot']['_itemStack']['_item']['_alias'],
                itemStorageSlotComponent['_itemStackSlot']['_itemStack']['_count'],
            ) :
            'free';
        debug('debug')(msg);
    });
}