import React from 'react';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameObject from '../../../core/source/GameObject.js';

export class MainHeroListRCElement_Legacy {
    heroClassName: string;
    itemLevel: number;

    exp: number;
    totalExpToLevelUp: number;
    level: number;

    strength: number;
    agility: number;
    intelligence: number;

    currentHealthPoints: number;
    maxHealthPoints: number;

    attackPower: number;
}

export interface HeroListUIProps_Legacy {
    container: ContainerInterface;
    mainHeroList: MainHeroList;
}

export interface HeroListUIState_Legacy {
    window: {
        show: boolean,
    };
    heroes: GameObject[];
    pages: number;
    activePage: number;
    totalHeroes: number;
}

export default class MainHeroListRC_Legacy extends React.Component<HeroListUIProps_Legacy, HeroListUIState_Legacy> {
    // private _options = {
    //     rows: 10,
    // };
    //
    // private _child;
    //
    // constructor(props: HeroListUIProps_Legacy) {
    //     super(props);
    //
    //     this.state = {
    //         window: {
    //             // show: false,
    //             show: true,
    //         },
    //         heroes: [],
    //         pages: 0,
    //         activePage: 0,
    //         totalHeroes: 0,
    //     };
    //
    //     props.container.set<MainHeroListRC_Legacy>(ServiceID.UI_MainHeroList, this);
    //
    //     this.updateHeroes = this.updateHeroes.bind(this);
    //     this.updatePagination = this.updatePagination.bind(this);
    //
    //     window['app']['sandbox']['updateHeroes'] = (page: number) => {
    //         this.props.mainHeroList.render2(page, {
    //             updateHeroes: this.updateHeroes,
    //             updatePagination: this.updatePagination,
    //         });
    //     };
    //
    //     this._child = [];
    //     let i = 0;
    //     while (i < this._options.rows) {
    //         this._child.push(React.createRef());
    //         i++;
    //     }
    // }
    //
    // componentDidMount() {
    //     this.props.mainHeroList.render2(1, {
    //         updateHeroes: this.updateHeroes,
    //         updatePagination: this.updatePagination,
    //     });
    //
    //     // this._child.current.someMethod();
    //     // this.updateHeroes();
    // }
    //
    // updateByRequest(): void {
    //
    // }
    //
    // updateLevel(index: number, value: number): void {
    //     console.log('MainHeroListRC.update');
    // }
    // updateExp(index: number, value: number): void {
    //     console.log('MainHeroListRC.update');
    // }
    // updateTotalExpToLevelUp(index: number, value: number): void {
    //     console.log('MainHeroListRC.update');
    // }
    //
    // //todo: В общий класс.
    // show(): void {
    //     this.setState((state) => {
    //         // console.log(this._child[0].current);
    //         // console.log(this._child[0]);
    //         return {
    //             window: {
    //                 show: true,
    //             },
    //         };
    //     });
    //     // this.updateUI();
    // }
    //
    // hide() {
    //     this.setState((state) => {
    //         return {
    //             window: {
    //                 show: false,
    //             },
    //         };
    //     });
    // }
    //
    // toggleWindow(): void {
    //     this.setState((state) => {
    //         return {
    //             window: {
    //                 show: !state.window.show,
    //             },
    //         };
    //     });
    //     // this.updateUI();
    // }
    //
    // /*
    //     В ui передается нужное кол-во героев. Страница, кол-во на страницу, смещение.
    //     Логические компоненты связываются с ui как и у DetailHero.
    //
    //     Обновить страницу.
    //     Героям добавляет функции рендера.
    //     При обновлении страницы из старых героев функции удаляются, к новым добавляются.
    //
    //     Удаление героя и добавление не влияет на ui. Герои не удаляются и не добавляются.
    //     При удалении героя - герой в ui помечается как удаленный.
    //     При добавлении героя ничего не происходит. Для этого нужно обновить ui вручную или вызвать обновление из логического компонента. Но тогда этим будет не удобно пользоваться. Удобнее когда на выведенные герои не пропадают с экрана.
    //
    //     Пример изи вов со списком поиска групп.
    //     Для получения нового списка нужно нажать кнопку обновить.
    //     При изменении состояния группы происходит изменение ui.
    //         Изменение числа персонажей в группе.
    //         Удаление группы из поиска.
    //     При изменении названия, описания, требований вроде ничего не происходит.
    //  */
    //
    // updateUI(): void {
    //     // console.log('updateUI', this.state.window.show);
    //     // if (!this.state.window.show) return;
    //
    //     for (let i = 0; i < this._child.length; i++) {
    //         if (this.state.heroes[i]) {
    //             this._child[i].current.updateHero(this.state.heroes[i]);
    //         } else {
    //             this._child[i].current.removeHero();
    //         }
    //     }
    // }
    //
    // updateHeroes(heroes: GameObject[]): void {
    //     // if (!this.state.window.show) return;
    //
    //     // console.log('updateHeroes.heroes', heroes);
    //     // console.log('this', this);
    //     this.setState((state) => {
    //         // console.log('this._child', this._child.current);
    //         if (this.state.window.show) {
    //             for (let i = 0; i < this._child.length; i++) {
    //                 if (!this._child[i].current) continue;
    //
    //                 if (heroes[i]) {
    //                     this._child[i].current.updateHero(heroes[i]);
    //                 } else {
    //                     this._child[i].current.removeHero();
    //                 }
    //             }
    //         }
    //
    //         // this.props.detailHeroRCHandler(heroes[0]);
    //
    //         // this._child[0].current.someMethod(heroes[0]);
    //         return {
    //             heroes: heroes,
    //         };
    //     });
    //
    //     // heroes[0].get<Experience>(ComponentID.Experience).render(this.updateExperience);
    //     // let index = 0;
    //     // while (index < this._options.rows) {
    //     //     let innerIndex = index;
    //     //     heroes[index].get<Experience>(ComponentID.Experience).render((level, exp, totalExpToLevelUp) => {
    //     //         console.log('render callback', exp);
    //     //         console.log('render callback index', index);
    //     //         console.log('render callback innerIndex', innerIndex);
    //     //     });
    //     //     index++;
    //     // }
    //
    //     // heroes[++index].get<Experience>(ComponentID.Experience).render((level, exp, totalExpToLevelUp) => {
    //     //     let innerIndex = index;
    //     //     console.log('render callback', exp);
    //     //     console.log('render callback index', index);
    //     //     console.log('render callback innerIndex', innerIndex);
    //     // });
    //     // heroes[index].get<Experience>(ComponentID.Experience).render(this.updateExperience);
    //     // this.updateHandler(heroes[0]);
    //     // for (let i = 0; i < heroes.length; i++) {
    //     //     // heroes[i].get<HeroComponent>(ComponentID.Hero).render(this.updateHeroClassName);
    //     //     // heroes[i].get<Experience>(ComponentID.Experience).render(this.updateExperience);
    //     // }
    //     // for (let i = 0; i < heroes.length; i++) {
    //     //     heroes[i].get<Experience>(ComponentID.Experience).render(this.updateExperience);
    //     // }
    //     // this._child[0].current.someMethod(4242);
    //     // this.updateUI();
    // }
    //
    // // updateHeroes(heroes: MainHeroListElement[]): void {
    // //     this.setState((state) => {
    // //         return {
    // //             heroes: heroes,
    // //         };
    // //     });
    // // }
    //
    // updatePagination(pages: number, activePage: number, totalHeroes: number) {
    //     this.setState((state) => {
    //         return {
    //             activePage: activePage,
    //             pages: pages,
    //             totalHeroes: totalHeroes,
    //         };
    //     })
    // }
    //
    // // // update(index: number, property: keyof MainHeroListElement, value: any) {
    // // update(index: number, values: Partial<MainHeroListElement>) {
    // // // update(index: number, values: {[key in MainHeroListElement]: any}) {
    // // // update(index: number, property: string, value) {
    // //     let heroes = [...this.state.heroes];
    // //     let hero = heroes[index];
    // //     assertNotNil(hero);
    // //
    // //     // hero[property] = value;
    // //     for (const valuesKey in values) {
    // //         hero[valuesKey] = values[valuesKey];
    // //     }
    // //
    // //     this.setState((state) => {
    // //         return {
    // //             heroes: heroes,
    // //         };
    // //     });
    // // }
    //
    // // _updateState(index, callback: (hero: MainHeroListElement) => void) {
    // //     this.setState((state) => {
    // //         let heroes = [...state.heroes];
    // //         let hero = heroes[index];
    // //
    // //         // callback(hero);
    // //
    // //         return {
    // //             heroes: heroes,
    // //         };
    // //     });
    // // }
    //
    // // update(heroes: GameObject[]) {
    // //     this.setState((state) => {
    // //         return {
    // //             // heroes: heroes,
    // //             // heroes: [
    // //             //     {
    // //             //         heroClassName: HeroClassID.Warrior,
    // //             //         // heroClassIconID: IconID.Shield01,
    // //             //         exp: 0,
    // //             //         totalExpToLevelUp: 1000,
    // //             //         level: 1,
    // //             //         strength: 10,
    // //             //         agility: 20,
    // //             //         intelligence: 30,
    // //             //         attackPower: 42,
    // //             //         currentHealthPoints: 80,
    // //             //         maxHealthPoints: 100,
    // //             //         // equip: [],
    // //             //         itemLevel: 42,
    // //             //     }
    // //             // ],
    // //         };
    // //     });
    // // }
    //
    // // updateHeroClassName(index: number, value: string) {
    // //     this._updateState(index, (hero) => {
    // //         hero.heroClassName = value as HeroClassID;
    // //     });
    // // }
    // //
    // /**
    //  * Эту функцию надо передать в Experience. Но это нужно сделать вместе с индексом.
    //  * @param level
    //  * @param exp
    //  * @param totalExpToLevelUp
    //  */
    // updateExperience(level: number, exp: number, totalExpToLevelUp: number): void {
    //     console.log('MainHeroListRC.updateExperience', exp);
    //     // this.setState((state) => {
    //     //     return {
    //     //         level: level,
    //     //         exp: exp,
    //     //         totalExpToLevelUp: totalExpToLevelUp,
    //     //     };
    //     // });
    // }
    // //
    // // updateTotalExpToLevelUp(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.totalExpToLevelUp = value;
    // //     });
    // // }
    // //
    // // updateLevel(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.level = value;
    // //     });
    // // }
    // //
    // // updateHealthPoints(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.currentHealthPoints = value;
    // //     });
    // // }
    // //
    // // updateMaxHealthPoints(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.maxHealthPoints = value;
    // //     });
    // // }
    // //
    // // updateAttackPower(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.attackPower = value;
    // //     });
    // // }
    // //
    // // updateStrength(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.strength = value;
    // //     });
    // // }
    // //
    // // updateAgility(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.agility = value;
    // //     });
    // // }
    // //
    // // updateIntelligence(index: number, value: number) {
    // //     this._updateState(index, (hero) => {
    // //         hero.intelligence = value;
    // //     });
    // // }
    //
    // // updateEquipSlot(index: number, ID: EquipSlotID, iconID: IconID) {
    // //
    // // }
    //
    // render() {
    //     if (!this.state.window.show) return;
    //
    //     let heroes = this.state.heroes;
    //
    //     let elements = [];
    //     for (let i = 0; i < this._options.rows; i++) {
    //         elements.push(
    //             <MainHeroListElementRC_Legacy
    //                 key={i}
    //                 hero={this.state.heroes[i]}
    //                 ref={this._child[i]}
    //                 // // heroClassIcon={heroes[i].heroClassIconID}
    //                 // heroClass={heroes[i].heroClassName}
    //                 // level={heroes[i].level}
    //                 // exp={heroes[i].exp}
    //                 // totalExpToLevelUp={heroes[i].totalExpToLevelUp}
    //                 // attackPower={heroes[i].attackPower}
    //                 // currentHealthPoints={heroes[i].currentHealthPoints}
    //                 // maxHealthPoints={heroes[i].maxHealthPoints}
    //                 // // state={}
    //                 // strength={heroes[i].strength}
    //                 // agility={heroes[i].agility}
    //                 // intelligence={heroes[i].intelligence}
    //                 // itemLevel={heroes[i].itemLevel}
    //                 // // equip={equip}
    //             />
    //         );
    //     }
    //
    //     console.log(this.state.window.show);
    //
    //     return (
    //         <div className={'widget'}>
    //             <div className={'widget__title'}>Главный список героев</div>
    //             <div className={'widget__content'}>
    //                 <div className={'hero-list-wrapper'}>
    //                     <table className={'hero-list-table'}>
    //                         <tbody>
    //                         <tr className={'hero-list-table-row'}>
    //                             {/*<th></th>*/}
    //                             <th>Класс (ID)</th>
    //                             <th>Роль</th>
    //                             <th style={{width: '220px'}}>Уровень (опыт)</th>
    //                             <th>ilvl</th>
    //                             <th>Очки здоровья</th>
    //                             <th>Статус</th>
    //                             <th>Сила атаки</th>
    //                             <th>СИЛ/ЛОВ/ИНТ</th>
    //                             {/*<th>Статус</th>*/}
    //                             {/*<th>{equipHeadElements}</th>*/}
    //                             <th>Управление</th>
    //                         </tr>
    //                         {elements}
    //                         </tbody>
    //                     </table>
    //                     <div>activePage: {this.state.activePage}, pages: {this.state.pages}, totalHeroes: {this.state.totalHeroes}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }//end render
    //
    // private _testData() {
    //     // this.addHero({
    //     //     heroClassName: HeroClassID.Warrior,
    //     //     heroClassIconID: IconID.Shield01,
    //     //     exp: 0,
    //     //     totalExpToLevelUp: 1000,
    //     //     level: 1,
    //     //     strength: 10,
    //     //     agility: 20,
    //     //     intelligence: 30,
    //     //     attackPower: 42,
    //     //     currentHealthPoints: 80,
    //     //     maxHealthPoints: 100,
    //     //     equip: [],
    //     // });
    //     // this.addHero({
    //     //     heroClassName: HeroClassID.Warrior,
    //     //     heroClassIconID: IconID.Shield01,
    //     //     exp: 0,
    //     //     totalExpToLevelUp: 1000,
    //     //     level: 1,
    //     //     strength: 10,
    //     //     agility: 20,
    //     //     intelligence: 30,
    //     //     attackPower: 42,
    //     //     currentHealthPoints: 80,
    //     //     maxHealthPoints: 100,
    //     //     equip: [],
    //     // });
    //     // this.addHero({
    //     //     heroClassName: HeroClassID.Warrior,
    //     //     heroClassIconID: IconID.Shield01,
    //     //     exp: 0,
    //     //     totalExpToLevelUp: 1000,
    //     //     level: 1,
    //     //     strength: 10,
    //     //     agility: 20,
    //     //     intelligence: 30,
    //     //     attackPower: 42,
    //     //     currentHealthPoints: 80,
    //     //     maxHealthPoints: 100,
    //     //     equip: [],
    //     // });
    // }
    render() {
        return (
            <div>
                42
            </div>
        );
    }
}