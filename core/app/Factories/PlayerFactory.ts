/**
 * Создается объект GameObject. Не путать с объектом из базы данных.
 */
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';
import GameObject from '../../source/GameObject.js';
import PlayerComponent from '../Components/PlayerComponent.js';
import LevelComponent from '../Components/LevelComponent.js';

export type PlayerFactoryConfig = {
    maxLevel: number;
};

export default class PlayerFactory {
    private readonly _idGenerator: AutoIncrementIDGenerator;
    private readonly _config: PlayerFactoryConfig;

    constructor(idGenerator: AutoIncrementIDGenerator, config: PlayerFactoryConfig) {
        this._idGenerator = idGenerator;
        this._config = config;
    }

    create(): GameObject {
        let playerGameObject = new GameObject(this._idGenerator.generateID());

        playerGameObject.name = 'Player';
        playerGameObject.addTags('#player');

        playerGameObject.addComponent(new PlayerComponent(
            this._idGenerator.generateID(),
            playerGameObject,
        ));

        playerGameObject.addComponent(new LevelComponent(
            this._idGenerator.generateID(),
            playerGameObject,
            1,
            this._config.maxLevel,
        ));

        return playerGameObject;
    }
}