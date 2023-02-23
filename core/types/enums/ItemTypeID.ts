/**
 * От типа зависит:
 * Наличие ArmorMaterial.
 * Логика генерации атрибутов: у оружия нет хп, ювелирка как в вове.
 * Привязка к направлению производства.
 * А также определение данных при генерации.
 */
export enum ItemTypeID {
    Armor = 'Armor',
    Weapon = 'Weapon',
    Jewelry = 'Jewelry',
    Trinket = 'Trinket',
    Shield = 'Shield',
}