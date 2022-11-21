export enum CommandID {
    new_game = 'new_game',
    create_player_env = 'create_player_env',
    create_start_player_objects = 'create_start_player_objects',
    create_start_player_items = 'create_start_player_items',

    add_gold = 'add_gold',

    create_item_storage = 'create_item_storage',
    clear_item_storage_slot = 'clear_item_storage_slot',
    create_item = 'create_item',
    create_item_kit = 'create_item_kit',

    create_hero = 'create_hero',
    delete_hero = 'delete_hero',
    create_random_hero_class = 'create_random_hero_class',
    create_all_hero_classes = 'create_all_hero_classes',
    kill_hero = 'kill_hero',
    resurrect_hero = 'resurrect_hero',
    equip_from_item_storage_slot = 'equip_from_item_storage_slot',
    remove_equip_to_item_storage_slot = 'remove_equip_to_item_storage_slot',

    create_location = 'create_location',
    delete_location = 'delete_location',
    add_hero_to_location = 'add_hero_to_location',
    remove_hero_from_location = 'remove_hero_from_location',
    toggle_location = 'toggle_location',
    get_reward_from_location = 'get_reward_from_location',

    fight = 'fight',

    debug_entity_manager = 'debug_entity_manager',
    debug_item_database = 'debug_item_database',
    create_stub_objects = 'create_stub_objects',
}