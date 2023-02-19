import {sprintf} from 'sprintf-js';
import Item from '../../app/Entities/Item.js';
import EquipSlot from '../../app/Entities/EquipSlot.js';
import HeroClass from '../../app/Entities/HeroClass.js';
import ArmorMaterial from '../../app/Entities/ArmorMaterial.js';
import _ from 'lodash';

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

    static componentNotFound(key: string) {
        return new AppError(sprintf('Компонент %s не найден в GameObject.', key));
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
        // return new AppError(sprintf('Размер стека для предмета "%s" должен быть в диапазоне %s-%s', item.name, 0, item.stackSize));
        return new AppError(sprintf('Размер стека для предмета не верный.'));
        // return new AppError(sprintf('Размер стека для предмета "%s" не может быть больше %s.', item.name, item.properties.stackSize));
    }

    static freeItemStorageSlotNotFound() {
        return new AppError('Свободных слотов не найдено.');
    }

    static itemNotEquipable(item?: Item) {
        // return new AppError(sprintf('Предмет "%s" нельзя экипировать.', item.name));
        return new AppError(sprintf('Предмет "%s" нельзя экипировать.'));
    }

    static itemNotAvailableForEquip(item?: Item, equipSlot?: EquipSlot) {
        return new AppError(sprintf('Предмет нельзя экипировать в указанный слот.'));
    }

    static pathNotExists(target: string) {
        return new AppError(sprintf('Путь %s не существует.', target));
    }

    static itemCategoryNotAvailable(item?: Item, equipSlot?: EquipSlot) {
        // return new AppError(sprintf('Предмет категории "%s" нельзя экипировать в слот "%s"', item.itemCategory.name, equipSlot.name));
        return new AppError(sprintf('Предмет данной категории нельзя экипировать в выбранный слот.'));
    }

    static equipNotAvailableByArmorMaterial(armorMaterial?: ArmorMaterial, heroClass?: HeroClass) {
        // return new AppError(sprintf('Предмет с материалом "%s" не доступен для класса "%s".', armorMaterial.name, heroClass.name));
        return new AppError(sprintf('Предмет данного материала не доступен для класса.'));
    }

    //todo: Не понятно название itemStorageRange.
    static itemStorageRangeOverflow(min: number, max: number) {
        return new AppError(sprintf('Кол-во ItemStorage у игрока должно быть в диапазоне %s-%s.', min, max));
    }

    static playerHasMaxItemStorages() {
        return new AppError('Игрок имеет максимальное количество ItemStorage.');
    }

    static heroNotContainsEquipSlot(name?: string) {
        return new AppError(sprintf('Герой не содержит данного слота.'));
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

    static isDead() {
        return new AppError('Персонаж мертвый.');
    }

    static isNotDead() {
        return new AppError('Персонаж живой.');
    }

    static deprecated() {
        return new AppError('Код устарел и больше не работает.');
    }

    static notImplements() {
        return new AppError('Метод еще не реализован.');
    }

    static not() {
        return new AppError('Метод еще не реализован.');
    }

    static legacy() {
        return new AppError('legacy');
    }

    static notWorking(message?: string) {
        return new AppError('Код не рабочий.' + _.isNil(message) ? ' ' + message : '');
    }

    static indev(message?: string) {
        return new AppError('В разработке.' + _.isNil(message) ? ' ' + message : '');
    }
}