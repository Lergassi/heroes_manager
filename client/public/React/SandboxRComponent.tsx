import React from 'react';
import ReactDOM from 'react-dom/client';
import {LocationContainerRComponent} from './LocationContainerRComponent.js';

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Добро пожаловать
            </h1>
            <p className="Dialog-message">
                Спасибо, что посетили наш космический корабль!
            </p>
        </FancyBorder>
    );
}

export default class SandboxRComponent extends React.Component<any, any>{
    _getter;

    constructor(props) {
        super(props);

        // let levelRange = new LevelRange(1, 5);
        // window['setMax'] = () => {
        //     levelRange.setMax(42);
        // }
        // console.log('levelRange', levelRange);
        // this._getter = levelRange.attach(this);
        //
        // //todo: В одном из компонентов в цепочке точно нужно будет обновить состояние.
        // this.state = {
        //
        // };
        // console.log('levelRange getter', levelRange['getter']);
        // console.log('getter', this['getter']().min);
    }

    update() {
        console.log('SandboxRComponent update');
    }

    render() {
        // let values = this['getter']();
        // let values = this._getter();
        // let min = levelRange.render().min;
        // let max = levelRange.render().max;
        //
        // let min = levelRange.render('min'); //И объект уже сам определяет как ему отдать данные.
        // let max = levelRange.render('max');
        // //или
        // let min = levelRange.render(this);
        // let max = levelRange.render(this);
        // //Кстате. Нельзя получить доступ к закрытым данным. Но можно их установить в момент создания или позже. Значит если передать в конструктор (min, max) то это нормально. Их можно получить через специальный метод. И обновление также.
        // // new RComponent();
        // attach(factory) {
        //     let rComponent = factory.create({
        //         min: this._min,
        //         max: this._max,
        //     });
        //     this._attaches.push(rComponent);
        //
        //     const getter = () => {
        //         return {
        //             min: this._min,
        //             max: this._max,
        //         }
        //     }
        //
        //     return rComponent;
        // }
        // update() {
        //     for (let i = 0; i < this._attaches.length; i++) {
        //         this._attaches[i].update();
        //     }
        // }

        return (
            <div>
                <h4>Sandbox</h4>

                {/*
                     Тут просто числа. Способы получения: прямо из объекта, ... Когда объект будет обновляться (через состояние или props) то логично, что объект уже известен. Сам объект не должен передавать отдельные данные, в методе нужно вызвать только update().
                */}
                {/*<div>level: {values.min}-{values.max}</div>*/}
                {/*<WelcomeDialog></WelcomeDialog>*/}
                {/*<LocationRComponent*/}
                {/*    locationComponent={window['gameLocation']}*/}
                {/*/>*/}
            </div>
        );
    }
}