import debug from 'debug';
import {sprintf} from 'sprintf-js';
import ItemCategory from '../app/Entities/ItemCategory.js';
import Item from '../app/Entities/Item.js';
import ArmorMaterial from '../app/Entities/ArmorMaterial.js';
import _ from 'lodash';

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
        name: entity.constructor.name,
        _id: entity['_id'],
        _name: entity['_name'],
        _alias: entity['_alias'],
    });
}

export function debugItem(item) {
    debug('debug')('%j', {
        name: item.constructor.name,
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
        name: itemCategory.constructor.name,
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
        name: equipSlot.constructor.name,
        _id: equipSlot['_id'],
        _name: equipSlot['_name'],
        _alias: equipSlot['_alias'],
    });

    equipSlot['_rules'].forEach((equipSlotRule) => {
        debug('debug')('%j', {
            name: equipSlotRule.constructor.name,
            _heroClass: {
                id: equipSlotRule['_heroClass']['_id'],
                name: equipSlotRule['_heroClass']['_name'],
            },
            itemCategories: equipSlotRule['_itemCategories'].map((itemCategory) => {
                return {
                    id: itemCategory['_id'],
                    name: itemCategory['_name'],
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