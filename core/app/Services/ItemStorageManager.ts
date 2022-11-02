import AppError from '../../source/Errors/AppError.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import GameObject from '../../source/GameObject.js';
import {unsigned} from '../../types/main.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

/**
 * @deprecated
 */
export default class ItemStorageManager {
    constructor() {
        throw new AppError('@legacy Удалить!');
    }
}