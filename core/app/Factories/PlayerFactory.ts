/**
 * Создается объект GameObject. Не путать с объектом из базы данных.
 */
import GameObject from '../../source/GameObject.js';
import PlayerComponent from '../Components/PlayerComponent.js';
import LevelComponent from '../Components/LevelComponent.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';

export type PlayerFactoryConfig = {
    maxLevel: number;
};

export default class PlayerFactory {
    private readonly _idGenerator: UUIDGenerator;
    private readonly _config: PlayerFactoryConfig;

    constructor(idGenerator: UUIDGenerator, config: PlayerFactoryConfig) {
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