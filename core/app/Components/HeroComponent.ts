import Component from '../../source/Component.js';
import HeroClass from '../Entities/HeroClass.js';

/**
 * todo: Убрать. Получается, что это класс только для хранения HeroClass.
 * @deprecated Заменить на имя и heroClass в контейнере.
 */
export default class HeroComponent {
    private readonly _name: string;
    private readonly _heroClass: HeroClass;

    get name(): string {
        return this._name;
    }

    /**
     * @deprecated
     */
    get heroClass(): HeroClass {
        return this._heroClass;
    }

    constructor(
        name: string,
        heroClass: HeroClass,
    ) {
        this._name = name;
        this._heroClass = heroClass;
    }

    attach(callbacks: {
        readHeroClass: (heroClass: HeroClass) => void,
    }) {
        callbacks.readHeroClass(this._heroClass);
    }
}