import EntityManager from '../source/EntityManager.js';
import Item from './Entities/Item.js';
import _ from 'lodash';
import EntityManagerInterface from './Interfaces/EntityManagerInterface.js';
import GameObject from '../source/GameObject.js';
import HealthPointsComponent from './Components/HealthPointsComponent.js';
import {ComponentID} from '../types/enums/ComponentID.js';

export function extractItems_dev(entityManager: EntityManagerInterface) {
    return entityManager['_entities']['Item'];
}

export function extractHealthPoints(characters: GameObject[]) {
    return _.map(characters, (character) => {
        let healthPoints = character.get<HealthPointsComponent>(ComponentID.HealthPoints);

        return healthPoints ? (healthPoints.isDead() ? 'Dead' : healthPoints['_currentHealthPoints']) : undefined;
    })
}

export function separator(name?: string) {
    let separator = _.repeat('-', 32);
    // console.log(
    //     separator +
    //     (_.isNil(name) ? '' : ' ' + name + ' ') +
    //     separator
    // );
    // return separator +
    //     (_.isNil(name) ? '' : ' ' + name + ' ') +
    //     separator;
    return separator +
        (_.isNil(name) ? '' : ' ' + name + ' ')
        ;
}