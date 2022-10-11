import CharacterAttributeComponent from '../../../core/app/Components/CharacterAttributeComponent.js';
import React from 'react';

export interface CharacterAttributeValueRComponentProps {
    characterAttributeComponent: CharacterAttributeComponent;
}

export interface CharacterAttributeValueRComponentState {

}

/**
 * Выводит только финальное значение атрибута. По текущей логике компонент должен зависить от всех слотов.
 */
export default class CharacterAttributeValueRComponent extends React.Component<CharacterAttributeValueRComponentProps, CharacterAttributeValueRComponentState> {
    render() {
        let characterAttributeComponent = this.props.characterAttributeComponent;

        return (
            <span>
                {characterAttributeComponent.getFinalValue()}
            </span>
        );
    }
}