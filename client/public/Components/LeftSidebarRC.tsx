import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';

export interface LeftSidebarProps {
    items: any;
}

export interface LeftSidebarState {
    items: any;
}

export default class LeftSidebarRC extends React.Component<LeftSidebarProps, LeftSidebarState> {
    constructor(props: LeftSidebarProps) {
        super(props);

        this.state = {
            items: props.items,
        };
    }

    render() {
        let items = this.state.items;

        let elements = [];
        for (let i = 0; i < items.length; i++) {
            elements.push(
                <div key={i} className={'left-sidebar__item'}>
                    <a href="client/public/Components/LeftSidebarRC.tsx">
                        <span className={'left-sidebar__icon-wrapper'}>
                            <span className={'icon icon_Question01 icon_32'}></span>
                        </span>
                        <span className={'left-sidebar__menu-text'}>{items[i].name}</span>
                    </a>
                </div>);
        }

        return (
            <div className={'left-sidebar'}>
                {elements}
            </div>
        );
    }
}