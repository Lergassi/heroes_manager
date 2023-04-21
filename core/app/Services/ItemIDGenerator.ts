import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {database} from '../../data/ts/database.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {QualityID} from '../../types/enums/QualityID.js';

export default class ItemIDGenerator {
    private readonly _IDs = {};

    private readonly _IDPatterns = {
        withArmorMaterial: '%s_%s_%s_%s',
        withoutArmorMaterial: '%s_%s_%s',
    }

    constructor() {
        this._IDs = {};
    }

    /**
     * Формат: %ARMOR_MATERIAL%_%QUALITY%_%SINGLE_NAME%_%ITEM_LEVEL%_%NUMBER%
     * @param itemCategoryID
     * @param itemLevel
     * @param qualityID
     * @param options
     */
    generate(
        itemCategoryID: ItemCategoryID,
        itemLevel: number,
        qualityID: QualityID,
        options?: {
            armorMaterialID?: ArmorMaterialID,
        },
    ): string {
        let IDPattern = options?.armorMaterialID ? this._IDPatterns.withArmorMaterial : this._IDPatterns.withoutArmorMaterial;

        let IDPatternParams = [];

        IDPatternParams.push(qualityID);
        if (options?.armorMaterialID) IDPatternParams.push(options.armorMaterialID);
        IDPatternParams.push(database.metadata.items.singleItemName(itemCategoryID));
        IDPatternParams.push(_.padStart(String(itemLevel), 3, '0'));

        let ID = sprintf(IDPattern, ..._.filter(IDPatternParams, (value, key) => {
            return value !== undefined;
        }));

        if (this._IDs.hasOwnProperty(ID)) {
            this._IDs[ID] = ++this._IDs[ID];
        } else {
            this._IDs[ID] = 1;
        }

        ID += sprintf('_%s', _.padStart(String(this._IDs[ID]), 2, '0'));

        return ID;
    }
}