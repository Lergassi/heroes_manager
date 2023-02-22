import {format} from 'date-fns';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import {sprintf} from 'sprintf-js';
import GenerateItems from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/GenerateItems.js';
import GenerateItemsByPattern
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/GenerateItemsByPattern.js';
import ItemAttributeGenerator
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/ItemAttributeGenerator.js';
import HeroCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';

export const generate_items_by_patterns = (container: ContainerInterface) => {
    let items = [];
    let generateItems = new GenerateItemsByPattern(
        container,
        container.get<ItemAttributeGenerator>(ServiceID.ItemAttributeGenerator),
        container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
    );
    generateItems.run(items);

    let json = JSON.stringify(items);

    let time = format(new Date(), 'dd.MM.yyyy_HH:mm:ss');
    let filename = sprintf('auto_generated_equip_%s.json', time);
    let dir = './core/data/json';
    let pathname = path.join(dir, filename);
    fs.writeFile(pathname, json, (error) => {
        if (error) {
            console.log('ERROR', error);
            return;
        }

        debug(DebugNamespaceID.Log)(sprintf('Алгоритм by_pattern, v%s.', '0.0.1'));
        debug(DebugNamespaceID.Log)(sprintf('Данные записаны в файл: %s', pathname));
        debug(DebugNamespaceID.Log)(sprintf('Предметов создано: %s.', items.length));
    });
}