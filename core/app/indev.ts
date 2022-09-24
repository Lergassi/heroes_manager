import EntityManager from '../source/EntityManager.js';
import Item from './Entities/Item.js';

export function extractItems(entityManager: EntityManager) {
    return entityManager['_repositories'][Item.name]['_items'];
}