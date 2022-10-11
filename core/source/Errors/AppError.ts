import {sprintf} from 'sprintf-js';
import Item from '../../app/Entities/Item.js';
import EquipSlot from '../../app/Entities/EquipSlot.js';
import HeroClass from '../../app/Entities/HeroClass.js';
import ArmorMaterial from '../../app/Entities/ArmorMaterial.js';

export default class AppError extends Error {
    constructor(message?: string) {
        super(message);
    }

    static entityNotFound(entityName, id, key = 'id') {
        return new AppError(sprintf('Сущность "%s" %s(%s) не найдена.', entityName, key, id));
    }

    static gameObjectNotFound(id) {
        return new AppError(sprintf('GameObject id(%s) не найден.', id));
    }

    static componentNotFound(id) {
        return new AppError(sprintf('Компонент id(%s) в GameObject не найден.', id));
    }

    static playerNotLoaded() {
        return new AppError('Игрок не загружен.');
    }

    static userNotLoaded() {
        return new AppError('Пользователь не загружен.');
    }

    static userAlreadyLoaded() {
        return new AppError('Пользователь уже загружен.');
    }

    static playerAlreadyLoaded() {
        return new AppError('Игрок уже загружен.');
    }

    static metadataNotFound(name: string) {
        return new AppError(sprintf('Метаданные для %s не найдены.', name));
    }

    static itemStackSizeWrong(item: Item) {
        return new AppError(sprintf('Размер стека для предмета "%s" должен быть в диапазоне %s-%s', item.name, 0, item.stackSize));
        // return new AppError(sprintf('Размер стека для предмета "%s" не может быть больше %s.', item.name, item.properties.stackSize));
    }

    static freeItemStorageSlotNotFound() {
        return new AppError('Свободных слотов не найдено.');
    }

    static itemNotEquipable(item: Item) {
        return new AppError(sprintf('Предмет "%s" нельзя экипировать.', item.name));
    }

    static itemNotAvailableForEquip(item: Item, equipSlot: EquipSlot) {
        return new AppError(sprintf('Предмет "%s" нельзя экипировать в слот "%s".', item.name,equipSlot.name));
    }

    static pathNotExists(target: string) {
        return new AppError(sprintf('Путь %s не существует.', target));
    }

    static itemCategoryNotAvailable(item: Item, equipSlot: EquipSlot) {
        return new AppError(sprintf('Предмет категории "%s" нельзя экипировать в слот "%s"', item.itemCategory.name, equipSlot.name));
    }

    static equipNotAvailableByArmorMaterial(armorMaterial: ArmorMaterial, heroClass: HeroClass) {
        return new AppError(sprintf('Предмет с материалом "%s" не доступен для класса "%s".', armorMaterial.name, heroClass.name));
    }

    static itemStorageRangeOverflow(min: number, max: number) {
        return new AppError(sprintf('Кол-во ItemStorage у игрока должно быть в диапазоне %s-%s.', min, max));
    }

    static heroNotContainsEquipSlot(name: string) {
        return new AppError(sprintf('У героя нет слота "%s"', name));
    }

    static itemsNotEnoughForRandomSelection() {
        return new AppError('Кол-во элементов не достаточно для уникальной выборки.');
    }

    static stateOwnerNotAuthorized() {
        return new AppError('Изменить статус объекта может только объект его установивший.');
    }

    static rootElementNotFound() {
        return new AppError('Корневой элемент не найден.');
    }

    static playerHasMaxHeroes() {
        return new AppError('Нельзя создать нового героя. У игрока максимальное кол-во героев.');
    }
}