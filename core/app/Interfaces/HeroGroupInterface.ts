import GameObject from '../../source/GameObject.js';

export default interface HeroGroupInterface {
    addHero(hero: GameObject): void;
    removeHero(hero: GameObject): void
}