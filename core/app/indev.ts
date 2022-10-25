import EntityManager from '../source/EntityManager.js';
import Item from './Entities/Item.js';
import _ from 'lodash';
import EntityManagerInterface from './Interfaces/EntityManagerInterface.js';

export function extractItems_dev(entityManager: EntityManagerInterface) {
    return entityManager['_entities']['Item'];
}