/**
 * Создается объект GameObject. Не путать с объектом из базы данных.
 */
import GameObject from '../../source/GameObject.js';
import PlayerComponent from '../Components/PlayerComponent.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import {unsigned} from '../../types/main.js';
import GameObjectFactory from './GameObjectFactory.js';

export type PlayerFactoryConfig = {
    maxLevel: number;
};

export type PlayerFactoryOptions = {
    gameObjectFactory: GameObjectFactory;
    experienceComponentFactory: ExperienceComponentFactory;
    maxLevel: unsigned;
}

export default class PlayerFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _experienceComponentFactory: ExperienceComponentFactory;
    private readonly _maxLevel: unsigned;

    constructor(options: PlayerFactoryOptions) {
        this._gameObjectFactory = options.gameObjectFactory;
        this._experienceComponentFactory = options.experienceComponentFactory;
        this._maxLevel = options.maxLevel;
    }

    create(): GameObject {
        let playerGameObject = this._gameObjectFactory.create();

        playerGameObject.name = 'Player';
        playerGameObject.addTags('#player');

        playerGameObject.set(PlayerComponent.name, new PlayerComponent(

        ));

        //todo: Временно удалено. Тут будет другой компонент.
        // playerGameObject.set(ComponentID.Experience, this._experienceComponentFactory.create({
        //     level: 1,
        // }));

        return playerGameObject;
    }
}