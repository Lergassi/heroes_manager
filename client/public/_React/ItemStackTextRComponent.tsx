import ItemStack from '../../../core/app/RuntimeObjects/ItemStack.js';
import React from 'react';

export interface ItemStackTextRComponentProps {
    itemStack: ItemStack;
}

export interface ItemStackTextRComponentState {

}

/**
 * Класс для для отображения стека в виде текста. Можно передать null - класс сам разберется.
 */
export default class ItemStackTextRComponent extends React.Component<ItemStackTextRComponentProps, ItemStackTextRComponentState> {
    constructor(props: ItemStackTextRComponentProps) {
        super(props);
    }

    render() {
        let itemStack = this.props.itemStack;
        let element;
        if (itemStack) {
            element = (<span>{itemStack.item.name} ({itemStack.count})</span>);
        } else {
            element = (<span>free</span>);
        }

        return (
            <span>
                {element}
            </span>
        );
    }

    _renderItemStack(itemStack: ItemStack) {
        let element = <span>{itemStack.item.name} ({itemStack.count})</span>;
        // if (itemStack.item.isEquipable) {
        //     element = <span>{itemStack.item.name}</span>
        // } else {
        //     element = <span>{itemStack.item.name} ({itemStack.count})</span>
        // }

        return element;
    }
}