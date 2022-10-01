import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';

export class LevelRange {
    private readonly _min: number;
    private readonly _max: number;
    // private _min: number;
    // private _max: number;

    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
        //todo: validate
    }

    lessMin(level: number, options: Readonly<{
        strong?: boolean;
    }> = {}) {
        if (options.strong) {
            return level < this._min;
        } else {
            return level <= this._min;
        }
    }

    // moreMin(level: number, options: Readonly<{
    //     strong?: boolean;
    // }> = {}) {
    //     if (options.strong) {
    //         return level > this._min;
    //     } else {
    //         return level >= this._min;
    //     }
    // }

    // lessMax(level: number, strong = false) {
    //     if (strong) {
    //         return level < this._max;
    //     } else {
    //         return level <= this._max;
    //     }
    // }

    moreMax(level: number, options: Readonly<{
        strong?: boolean;
    }> = {}) {
        if (options.strong) {
            return level > this._max;
        } else {
            return level >= this._max;
        }
    }

    // attach(rComponent) {
    //     /*
    //         rComponent - один компонент или несколько. У всех у них разный интерфейс. Например отображение героя в списке, детально и гдето еще.
    //
    //         Никаких действий тут происходить не должно. В том числе потому что код будет в файле tsx.
    //         1 вариант.
    //             Просто установка значений в переданный компонент.
    //             Обновление рендера при вызове метода update() внутри данного компонента. Метод вызывается вручную в нужных методах.s
    //             rComponent уже создан и в него передан объект.
    //             Если просто передать данные, то это будет как обычный return всех данных без разбора.
    //      */
    //     rComponent.min = this._min;
    //     rComponent.max = this._max;
    //     //Как rComponent узнает что ему делать дальше? Если вызывать метод в конструкторе то будет не удобно.
    //
    //     //Можно обновлять состояние отдельно в каждом методе
    //     rComponent.update({
    //         min: this._min,
    //         max: this._max,
    //     });
    // }

    // update() {
    //     for (let i = 0; i < this._attaches.length; i++) {
    //         this._attaches[i].update({  //Тогда будет без насследования.
    //             min: this._min,
    //             max: this._max,
    //         });
    //     }
    // }

    // update2() {
    //     for (let i = 0; i < this._attaches.length; i++) {
    //         this._attaches[i].update(this); //С насследование. Просто вызвать в нужном методе update(); Базовый класс ничего не знает о потомках. Переменные должны быть доступны в рендере.
    //     }
    // }
    attach(rComponent) {
        const getter = () => {
            return {
                min: this._min,
                max: this._max,
            }
        }
        console.log(getter());

        // rComponent['getter'] = getter;
        this['_attaches'] = [
            rComponent,
        ];

        return getter;
    }

    // setMax(max: number) {
    //     this['_max'] = max;
    //     console.log('max установлен: ' + max);
    //     this.update();
    // }

    update() {
        console.log(this['_attaches']);
        for (let i = 0; i < this['_attaches'].length; i++) {
            this['_attaches'][i].update();
        }
    }

    render(callback: (values: Readonly<{
        min: number,
        max: number,
    }>) => void) {
        callback({
            min: this._min,
            max: this._max,
        });
    }
}

export default class LevelComponent extends Component {
    private _level: number;
    private readonly _maxLevel: number;
    private _exp: number;

    get level(): number {
        return this._level;
    }

    // set level(value: number) {
    //     this._level = value;
    // }

    get maxLevel(): number {
        return this._maxLevel;
    }

    get exp(): number {
        return this._exp;
    }

    // set exp(value: number) {
    //     this._exp = value;
    // }

    constructor(
        id: number,
        gameObject: GameObject,
        level: number,
        maxLevel: number,
        exp: number = 0,
    ) {
        super(id, gameObject);

        //todo: validate

        this._level = level;
        this._maxLevel = maxLevel;
        this._exp = exp;
    }
}