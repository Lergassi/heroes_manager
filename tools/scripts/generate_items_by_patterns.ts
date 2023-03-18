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
import {TSDB_ItemDB} from '../../core/data/ts/items.js';
import {TSDB_Recipe, TSDB_RecipeDB} from '../../core/data/ts/recipes.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import _ from 'lodash';
import {ProductionValueGenerator} from '../../core/app/Services/BalanceTools/ProductionValueGenerator';

export const generate_items_by_patterns = (container: ContainerInterface, options?: {
    onlyGenerate: boolean,
}) => {
    debug(DebugNamespaceID.Log)(sprintf('Алгоритм by_pattern, v%s.', '0.0.1'));

    let items: TSDB_ItemDB = {};
    let recipes: TSDB_RecipeDB = {};
    let generateItems = new GenerateItemsByPattern(
        container.get<ItemAttributeGenerator>(ServiceID.ItemAttributeGenerator),
        container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
        container.get<ProductionValueGenerator>(ServiceID.ProductionValueGenerator),
    );
    generateItems.run(items, recipes);

    if (options?.onlyGenerate) {
        debug(DebugNamespaceID.Log)('Данные сгенерированы, но не записаны. Флаг onlyGenerate=true');
        return;
    }

    let time = format(new Date(), 'dd.MM.yyyy_HH_mm_ss');

    let itemsString = JSON.stringify(items);
    let recipesString = JSON.stringify(recipes);

    let itemsFilename = sprintf('auto_generated_equip_%s.json', time);
    let recipesFilename = sprintf('auto_generated_equip_recipes_%s.json', time);
    let itemsDir = './core/data/json';
    let itemsPathname = path.join(itemsDir, itemsFilename);
    let recipesPathname = path.join(itemsDir, recipesFilename);

    let enumItemIDClassname = sprintf('__ItemID_%s', _.replace(time, /[.*]/g, ''));
    // let enumRecipeIDClassname = sprintf('__RecipeID_%s', _.replace(time, /[.*]/g, ''));

    let enumItemIDStringFilename: string = sprintf('%s.ts', enumItemIDClassname);
    let enumItemIDStringDir: string = './core/data/autogenerated_code';
    let enumItemIDStringPathname = path.join(enumItemIDStringDir, enumItemIDStringFilename);

    let enumIDsString: string = sprintf('export enum %s {\n', enumItemIDClassname);
    let itemsCount = 0;
    for (const key in items) {
        enumIDsString += sprintf('\t%s = \'%s\',\n', items[key].ID, items[key].ID);
        itemsCount++;
    }
    enumIDsString += '}'

    fs.writeFile(itemsPathname, itemsString, (error) => {
        if (error) {
            console.log('ERROR', error);
            return;
        }

        debug(DebugNamespaceID.Log)(sprintf('Данные записаны в файл: %s', itemsPathname));
        debug(DebugNamespaceID.Log)(sprintf('Предметов создано: %s.', itemsCount));
    });

    fs.writeFile(recipesPathname, recipesString, (error) => {
        if (error) {
            console.log('ERROR', error);
            return;
        }

        debug(DebugNamespaceID.Log)(sprintf('Рецепты записаны в файл: %s', recipesPathname));
        debug(DebugNamespaceID.Log)(sprintf('Рецепотов создано: %s.', itemsCount));
    });

    fs.writeFile(enumItemIDStringPathname, enumIDsString, (error) => {
        if (error) {
            console.log('ERROR', error);
            return;
        }

        debug(DebugNamespaceID.Log)(sprintf('__ItemAutoGeneratedID created: %s', enumItemIDStringPathname));
    });

    let auto_generated_equip_content_filepath = './client/data/autogenerated_code/auto_generated_equip.ts';
    let auto_generated_equip_content = sprintf('import _auto_generated_equip_db_data from \'../../../core/data/json/%s\';\n', itemsFilename);
    auto_generated_equip_content += 'export const auto_generated_equip_db_data = _auto_generated_equip_db_data;\n';
    auto_generated_equip_content += sprintf('console.log(\'auto_generated_equip_db_data: %s\');\n', itemsFilename);

    let auto_generated_equip_recipes_content_filepath = './client/data/autogenerated_code/auto_generated_equip_recipes.ts';
    let auto_generated_equip_recipes_content = sprintf('import _auto_generated_equip_recipes_db_data from \'../../../core/data/json/%s\';\n', recipesFilename);
    auto_generated_equip_recipes_content += 'export const auto_generated_equip_recipes_db_data = _auto_generated_equip_recipes_db_data;\n';
    auto_generated_equip_recipes_content += sprintf('console.log(\'auto_generated_equip_recipes_db_data: %s\');\n', recipesFilename);

    let autoGeneratedContent = [
        {filepath: auto_generated_equip_content_filepath, content: auto_generated_equip_content},
        {filepath: auto_generated_equip_recipes_content_filepath, content: auto_generated_equip_recipes_content},
    ];

    for (let i = 0; i < autoGeneratedContent.length; i++) {
        fs.writeFile(autoGeneratedContent[i].filepath, autoGeneratedContent[i].content, (error) => {
            if (error) {
                console.log('ERROR', error);
                return;
            }

            debug(DebugNamespaceID.Log)(sprintf('autogenerated code created: %s', autoGeneratedContent[i].filepath));
        });
    }
}