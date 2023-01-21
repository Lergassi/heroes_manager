import CharacterAttribute from '../../../core/app/Components/CharacterAttribute.js';
import React from 'react';

export interface CharacterAttributeValueRComponentProps {
    characterAttributeComponent: CharacterAttribute;
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
                {/*{characterAttributeComponent.finalValue}*/}
            </span>
        );
    }
}