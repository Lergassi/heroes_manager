import {HeroClassID} from '../../types/enums/HeroClassID.js';

let hero_classes_data = {
    [HeroClassID.Barbarian]: {
        start_health_points: 100,
        start_attack_power_points: 30,
    },
};

export const hero_classes = {
    startHealthPoints: (heroClassID: HeroClassID): number => {
        return 0;
    },
    healthPointsItemLevelStep: (heroClassID: HeroClassID): number => {
        return 0;
    },
};