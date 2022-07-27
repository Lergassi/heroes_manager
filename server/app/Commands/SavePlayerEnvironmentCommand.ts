import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import Serializer from '../../../core/source/Serializer.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import _ from 'lodash';
import {inspect} from 'util';
import fs from 'fs';
import path from 'path';
import UserDBObject from '../DBObjects/UserDBObject.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Security from '../../source/Security.js';

export default class SavePlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'save_player_env';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();
        this.container.get<Security>('server.security').assertIsPlayerLoaded();

        let serializer = this.container.get<Serializer>('server.serializer');
        let gameObjects = this.container.get<GameObjectStorage>('core.gameObjectStorage')['_gameObjects'];
        let services = this.container['_services'];

        let serializeGameObjects = _.map(gameObjects, (gameObject) => {
            return serializer.serialize(gameObject);
        });
        let serializeServices = _.filter(_.map(services, (service) => {
            return serializer.serialize(service);
        }), (item) => {
            return item !== undefined;
        });

        let saveObject = {
            date: new Date(),
            data: {
                services: serializeServices,
                gameObjects: serializeGameObjects,
            },
        };
        let saveObjectString = JSON.stringify(saveObject);

        let saveFileDir = path.resolve(
            this.container.get<object>('server.config')['savesDir'],
            // this.container.get<UserDBObject>('server.userDBObject')['_id'].toString(),
            this.container.get<Security>('server.security').user.id,
            // this.container.get<UserDBObject>('server.playerDBObject')['_id'].toString(),
            this.container.get<Security>('server.security').player.id,
        );
        let saveFilePath = path.resolve(saveFileDir, 'save.json');
        fs.mkdirSync(saveFileDir, {
            recursive: true,
        });
        fs.chownSync(saveFileDir, 1001, 1001);

        fs.writeFileSync(saveFilePath, saveObjectString);
        fs.chownSync(saveFilePath, 1001, 1001);

        debug('info')(sprintf('Данные сохранены в %s.', saveFilePath));
    }
}