import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import Serializer from '../../../core/source/Serializer.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import _ from 'lodash';
import fs from 'fs';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Security from '../../source/Security.js';
import MetadataManager from '../../../core/source/MetadataManager.js';
import PathResolver from '../../source/PathResolver.js';
import JsonSerializer from '../../../core/source/JsonSerializer.js';
import {ContainerKey} from '../../../core/types/containerKey.js';

export default class SavePlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'save_player_env';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();
        this.container.get<Security>('server.security').assertIsPlayerLoaded();

        let gameObjects = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage)['_gameObjects'];
        let services = this.container['_services'];

        let serializer = this.container.get<Serializer>('core.serializer');
        let jsonSerializer = this.container.get<JsonSerializer>('core.jsonSerializer');
        let metadataManager = this.container.get<MetadataManager>('core.metadataManager')

        // let serializeServices = _.filter(_.map(services, (service) => {
        //     if (service?.constructor?.name && metadataManager.hasMetadata(service.constructor.name)) {
        //         return serializer.serialize(service);
        //     }
        // }), (item) => {
        //     return !_.isNil(item);
        // });
        let serializeGameObjects = _.map(gameObjects, (gameObject) => {
            return serializer.serialize(gameObject);
        });

        let saveObject = {
            date: new Date(),
            data: {
                // services: serializeServices,
                gameObjects: serializeGameObjects,
            },
        };
        let saveObjectString = jsonSerializer.toJson(saveObject);

        let saveFilePath = this.container.get<PathResolver>('server.pathResolver').resolve(
            'server/data/saves',
            this.container.get<Security>('server.security').user.id.toString(),
            this.container.get<Security>('server.security').player.id.toString(),
            'save.json',
        );

        fs.writeFileSync(saveFilePath, saveObjectString);
        fs.chownSync(saveFilePath, 1001, 1001);

        debug('info')(sprintf('Данные сохранены в %s.', saveFilePath));
    }
}