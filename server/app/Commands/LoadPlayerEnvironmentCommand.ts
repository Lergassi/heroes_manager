import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import CoreContainerConfigure from '../../../core/app/ContainerConfigure.js';
import SaveInjectContainerDecorator from '../../../core/source/SaveInjectContainerDecorator.js';
import Container from '../../../core/source/Container.js';
import AutoIncrementIDGenerator from '../../../core/source/AutoIncrementIDGenerator.js';
import path from 'path';
import UserDBObject from '../DBObjects/UserDBObject.js';
import Security from '../../source/Security.js';
import fs from 'fs';
import AppError from '../../../core/source/AppError.js';
import {sprintf} from 'sprintf-js';
import Serializer from '../../../core/source/Serializer.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import debug from 'debug';
import {
    debugHeroes,
    debugItemStorages,
    debugPlayerEnv,
    debugPlayerGameObject,
    debugWallets
} from '../../../core/debug/debug_functions.js';
import PlayerDBObjectRepository from '../Repositories/PlayerDBObjectRepository.js';
import PlayerDBObject from '../DBObjects/PlayerDBObject.js';
import _ from 'lodash';

export default class LoadPlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'load_player_env';
    }

    configure() {
        super.configure();
        this.addArgument('name', '', true);
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();
        this.container.get<Security>('server.security').assertIsPlayerAlreadyLoaded();

        let name: string = _.trim(input.getArgument('name'));

        let playerDBObject = await this.container.get<PlayerDBObjectRepository<PlayerDBObject>>('server.playerDBObjectRepository').loadOneByName(this.container.get<Security>('server.security').user, name);
        this.container.get<Security>('server.security').loginPlayer(<PlayerDBObject>playerDBObject);

        let saveFilePath = path.resolve(
            this.container.get<object>('server.config')['savesDir'],
            this.container.get<Security>('server.security').user.id,
            this.container.get<Security>('server.security').player.id,
            'save.json',
        );
        if (!fs.existsSync(saveFilePath)) {
            throw new AppError(sprintf('Игрок с id:%s не найден.', name));
        }

        let serializer = this.container.get<Serializer>('server.serializer');

        //todo: Проверка входных данных.
        let stringData = fs.readFileSync(saveFilePath);
        let objectData = JSON.parse(stringData.toString());

        // (new CoreContainerConfigure()).configure(this.container);
        (new CoreContainerConfigure()).configure(new SaveInjectContainerDecorator(serializer, this.container, objectData['data']['services']));
        // console.log(this.container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'));
        // console.log(this.name);

        let gameObjectStorage = this.container.get<GameObjectStorage>('core.gameObjectStorage');
        for (let i = 0; i < objectData['data']['gameObjects'].length; i++) {
            gameObjectStorage.add(serializer.unserialize(objectData['data']['gameObjects'][i]));
        }

        // debugPlayerGameObject(this.container);
        // debugItemStorages(this.container);
        // debugWallets(this.container);
        // debugHeroes(this.container);

        debug('info')(sprintf('Окружение игрока загружено, ID: %s загружено.', name));
    }
}