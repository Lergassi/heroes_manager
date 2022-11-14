import {EntityID} from '../../../types/enums/EntityID.js';
import HeroRole from '../../Entities/HeroRole.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import Icon from '../../Entities/Icon.js';
import {IconID} from '../../../types/enums/IconID.js';

export default class HeroRoleFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        sort: number,
        icon: IconID,
    ) {
        return this._entityManager.add<HeroRole>(EntityID.HeroRole, id, new HeroRole(
            id,
            name,
            sort,
            this._entityManager.get<Icon>(EntityID.Icon, icon),
        ));
    }
}