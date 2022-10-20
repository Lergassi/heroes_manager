export enum CommandNameID {
    new_game = 'new_game',
    create_player_env = 'create_player_env',
    create_player_start_objects = 'create_player_start_objects',

    create_item_storage = 'create_item_storage',
    clear_slot_item_storage_slot = 'clear_slot_item_storage_slot',
    add_item = 'add_item',

    create_hero = 'create_hero',
    delete_hero = 'delete_hero',
    kill_hero = 'kill_hero',
    resurrect_hero = 'resurrect_hero',
    create_all_hero_classes = 'create_all_hero_classes',
    equip_from_item_storage_slot = 'equip_from_item_storage_slot',
    remove_equip_to_item_storage_slot = 'remove_equip_to_item_storage_slot',

    create_location = 'create_location',
    delete_location = 'delete_location',
    add_hero_to_location = 'add_hero_to_location',
    remove_hero_from_location = 'remove_hero_from_location',
    toggle_location = 'resurrect_hero',
    get_items_from_location = 'get_items_from_location',

    fight = 'fight',

}